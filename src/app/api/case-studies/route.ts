import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";
import { requireAuth, AuthError } from "@/lib/auth/require-auth";
import { getSession } from "@/lib/auth/session";
import { createCaseStudySchema } from "@/lib/validations/case-study";
import {
  CASE_STUDY_STATUSES,
  PROPERTY_TYPES,
  CASE_STUDY_PROJECT_TYPES,
} from "@/types/case-study";

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface LeanCaseStudyList {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  client: { name: string; industry?: string };
  location: string;
  propertyType: string;
  projectType: string;
  coverImage: { url: string; alt: string };
  services: string[];
  status: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// POST /api/case-studies - Create Case Study (Protected: Admin/Editor)
export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    await requireAuth();

    // 2. Parse request body
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Malformed request body",
          },
        },
        { status: 400 }
      );
    }

    // 3. Validate request data
    const parsed = createCaseStudySchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            fields: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    await connectToDatabase();

    // 4. Verify slug uniqueness
    const existing = await CaseStudy.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "A case study with this slug already exists",
          },
        },
        { status: 409 }
      );
    }

    // 5. Apply publishing date logic
    let publishedAt = data.publishedAt;
    if (data.status === "published" && !publishedAt) {
      publishedAt = new Date();
    }

    // 6. Create Case Study
    const caseStudy = await CaseStudy.create({
      title: data.title,
      slug: data.slug,
      client: data.client,
      location: data.location,
      propertyType: data.propertyType,
      projectType: data.projectType,
      overview: data.overview,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      services: data.services,
      coverImage: data.coverImage,
      gallery: data.gallery,
      status: data.status,
      publishedAt,
      seo: data.seo,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: caseStudy._id.toString(),
          slug: caseStudy.slug,
          status: caseStudy.status,
        },
        message: "Case study created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
          },
        },
        { status: error.status }
      );
    }

    console.error("API POST create case study error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process case study request",
        },
      },
      { status: 500 }
    );
  }
}

// GET /api/case-studies - List Case Studies (Public & CMS Admin)
export async function GET(req: Request) {
  try {
    // 1. Check if user is authenticated for Admin view
    const session = await getSession();
    const isAdmin = !!session;

    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "12", 10);
    const statusParam = searchParams.get("status");
    const propertyTypeParam = searchParams.get("propertyType");
    const projectTypeParam = searchParams.get("projectType");
    const locationParam = searchParams.get("location");
    const searchParam = searchParams.get("search");

    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limit = isNaN(limitParam) || limitParam < 1 ? 12 : Math.min(limitParam, 100);

    // Build DB Query conditions
    const query: {
      status?: string;
      propertyType?: string;
      projectType?: string;
      location?: RegExp;
      $or?: Array<Record<string, RegExp>>;
    } = {};

    // 2. Enforce visibility permissions (public sees only published)
    if (!isAdmin) {
      query.status = "published";
    } else if (statusParam) {
      // Validate status query parameter
      if (!CASE_STUDY_STATUSES.includes(statusParam as (typeof CASE_STUDY_STATUSES)[number])) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid status query value",
            },
          },
          { status: 422 }
        );
      }
      query.status = statusParam;
    }

    // 3. Property Type Filter
    if (propertyTypeParam) {
      if (!PROPERTY_TYPES.includes(propertyTypeParam as (typeof PROPERTY_TYPES)[number])) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid propertyType query value",
            },
          },
          { status: 422 }
        );
      }
      query.propertyType = propertyTypeParam;
    }

    // 4. Project Type Filter
    if (projectTypeParam) {
      if (!CASE_STUDY_PROJECT_TYPES.includes(projectTypeParam as (typeof CASE_STUDY_PROJECT_TYPES)[number])) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid projectType query value",
            },
          },
          { status: 422 }
        );
      }
      query.projectType = projectTypeParam;
    }

    // 5. Location Filter
    if (locationParam) {
      const escapedLoc = escapeRegex(locationParam.trim());
      if (escapedLoc) {
        query.location = new RegExp(escapedLoc, "i");
      }
    }

    // 6. Safe Search
    if (searchParam) {
      const truncated = searchParam.trim().substring(0, 50);
      if (truncated) {
        const escaped = escapeRegex(truncated);
        const searchRegex = new RegExp(escaped, "i");
        query.$or = [
          { title: searchRegex },
          { "client.name": searchRegex },
          { location: searchRegex },
          { propertyType: searchRegex },
          { projectType: searchRegex },
          { services: searchRegex },
        ];
      }
    }

    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Sorting: publishedAt desc (for public) or createdAt desc (for admin lists)
    const sortOption: Record<string, 1 | -1> = !isAdmin
      ? { publishedAt: -1 }
      : { createdAt: -1 };

    // Fetch lightweight list omitting the complete case study detail fields
    const [total, caseStudies] = await Promise.all([
      CaseStudy.countDocuments(query),
      CaseStudy.find(query)
        .select("-overview -challenge -solution")
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const transformed = (caseStudies as unknown as LeanCaseStudyList[]).map((doc) => {
      return {
        id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        client: doc.client,
        location: doc.location,
        propertyType: doc.propertyType,
        projectType: doc.projectType,
        coverImage: doc.coverImage,
        services: doc.services,
        status: doc.status,
        publishedAt: doc.publishedAt,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        data: transformed,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API GET list case studies error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process case study request",
        },
      },
      { status: 500 }
    );
  }
}
