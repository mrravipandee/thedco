import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";
import { requireAuth, requireAdmin, AuthError } from "@/lib/auth/require-auth";
import { updateCaseStudySchema } from "@/lib/validations/case-study";

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

interface LeanCaseStudyDetail {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  client: { name: string; industry?: string };
  location: string;
  propertyType: string;
  projectType: string;
  overview: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; value: string; description?: string }>;
  services: string[];
  coverImage: { url: string; alt: string };
  gallery?: Array<{ url: string; alt: string }>;
  status: string;
  publishedAt?: Date;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// GET /api/case-studies/[id] - Get Complete Case Study (Protected: Admin/Editor)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user
    await requireAuth();

    const { id } = await params;

    // 2. Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid case study ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Query Database
    const doc = await CaseStudy.findById(id).lean();
    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Case study not found",
          },
        },
        { status: 404 }
      );
    }

    const data = doc as unknown as LeanCaseStudyDetail;

    // 4. Transform response replacing _id with id
    const transformed = {
      id: data._id.toString(),
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
      publishedAt: data.publishedAt,
      seo: data.seo,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        data: transformed,
      },
      { status: 200 }
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

    console.error("API GET case study by ID error:", error);
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

// PATCH /api/case-studies/[id] - Update Case Study (Protected: Admin/Editor)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user
    await requireAuth();

    const { id } = await params;

    // 2. Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid case study ID",
          },
        },
        { status: 400 }
      );
    }

    // 3. Parse request body
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

    // 4. Validate partial updates
    const parsed = updateCaseStudySchema.safeParse(payload);
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

    const updates = parsed.data;

    await connectToDatabase();

    // 5. Query active document
    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Case study not found",
          },
        },
        { status: 404 }
      );
    }

    // 6. Check unique slug conflict if modified
    if (updates.slug && updates.slug !== caseStudy.slug) {
      const duplicate = await CaseStudy.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (duplicate) {
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
    }

    // 7. Apply status changes and publishing logic
    if (updates.status) {
      if (updates.status === "published" && !caseStudy.publishedAt && !updates.publishedAt) {
        caseStudy.publishedAt = new Date();
      }
      caseStudy.status = updates.status;
    }

    // 8. Apply remaining validated updates
    if (updates.title) caseStudy.title = updates.title;
    if (updates.slug) caseStudy.slug = updates.slug;
    if (updates.client) caseStudy.client = updates.client;
    if (updates.location) caseStudy.location = updates.location;
    if (updates.propertyType) caseStudy.propertyType = updates.propertyType;
    if (updates.projectType) caseStudy.projectType = updates.projectType;
    if (updates.overview) caseStudy.overview = updates.overview;
    if (updates.challenge) caseStudy.challenge = updates.challenge;
    if (updates.solution) caseStudy.solution = updates.solution;
    if (updates.results) caseStudy.results = updates.results;
    if (updates.services) caseStudy.services = updates.services;
    if (updates.coverImage) caseStudy.coverImage = updates.coverImage;
    if (updates.gallery) caseStudy.gallery = updates.gallery;
    if (updates.publishedAt) caseStudy.publishedAt = updates.publishedAt;
    if (updates.seo) caseStudy.seo = updates.seo;

    await caseStudy.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: caseStudy._id.toString(),
          slug: caseStudy.slug,
          status: caseStudy.status,
          publishedAt: caseStudy.publishedAt,
        },
        message: "Case study updated successfully",
      },
      { status: 200 }
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

    console.error("API PATCH update case study error:", error);
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

// DELETE /api/case-studies/[id] - Delete Case Study (Protected: Admin Only)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorize Admin
    await requireAdmin();

    const { id } = await params;

    // 2. Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid case study ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Delete document
    const result = await CaseStudy.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Case study not found",
          },
        },
        { status: 404 }
      );
    }

    // 4. Return success (do not return the deleted document)
    return NextResponse.json(
      {
        success: true,
        message: "Case study deleted successfully",
      },
      { status: 200 }
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

    console.error("API DELETE case study error:", error);
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
