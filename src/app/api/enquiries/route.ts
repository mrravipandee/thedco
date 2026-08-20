import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { createEnquirySchema } from "@/lib/validations/enquiry";
import Enquiry from "@/models/Enquiry";
import { requireAuth, AuthError } from "@/lib/auth/require-auth";
import { ENQUIRY_STATUSES } from "@/types/enquiry";

const allowedKeys = new Set(Object.keys(createEnquirySchema.shape));

function buildValidationError(error: z.ZodError) {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.length > 0 ? issue.path.join(".") : "request";
    if (!fields[path]) {
      fields[path] = issue.message;
    }
  }

  return {
    success: false,
    error: {
      message: "Validation failed",
      fields,
    },
  };
}

export async function POST(req: Request) {
  try {
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

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            fields: {
              request: "Request body must be a JSON object.",
            },
          },
        },
        { status: 422 }
      );
    }

    const body = payload as Record<string, unknown>;
    const unknownFields = Object.keys(body).filter((key) => !allowedKeys.has(key));

    if (unknownFields.length > 0) {
      const fields: Record<string, string> = {};
      for (const field of unknownFields) {
        fields[field] = "Unexpected field.";
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            fields,
          },
        },
        { status: 422 }
      );
    }

    const parsed = createEnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildValidationError(parsed.error), { status: 422 });
    }

    await connectToDatabase();

    const { name, email, phone, company, projectType, location, projectStage, message } = parsed.data;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      company,
      projectType,
      location,
      projectStage,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: enquiry._id.toString(),
        },
        message: "Enquiry submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API enquiry submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to submit enquiry",
        },
      },
      { status: 500 }
    );
  }
}

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface LeanEnquiry {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  location?: string;
  projectStage?: string;
  businessStatus?: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(req: Request) {
  try {
    // 1. Authenticate the user (any role: admin/editor)
    await requireAuth();

    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "20", 10);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limit = isNaN(limitParam) || limitParam < 1 ? 20 : Math.min(limitParam, 100);

    if (status && !ENQUIRY_STATUSES.includes(status as (typeof ENQUIRY_STATUSES)[number])) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid status filter value",
          },
        },
        { status: 422 }
      );
    }

    const query: {
      status?: string;
      $or?: Array<Record<string, RegExp>>;
    } = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      const truncatedSearch = search.trim().substring(0, 50);
      if (truncatedSearch) {
        const escaped = escapeRegex(truncatedSearch);
        const searchRegex = new RegExp(escaped, "i");
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { company: searchRegex },
          { phone: searchRegex },
          { location: searchRegex },
        ];
      }
    }

    await connectToDatabase();

    const skip = (page - 1) * limit;

    const [total, enquiries] = await Promise.all([
      Enquiry.countDocuments(query),
      Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const transformedEnquiries = (enquiries as unknown as LeanEnquiry[]).map((enquiry) => {
      return {
        id: enquiry._id.toString(),
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        company: enquiry.company,
        projectType: enquiry.projectType,
        location: enquiry.location,
        projectStage: enquiry.projectStage,
        businessStatus: enquiry.businessStatus,
        message: enquiry.message,
        status: enquiry.status,
        createdAt: enquiry.createdAt,
        updatedAt: enquiry.updatedAt,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        data: transformedEnquiries,
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

    console.error("API GET enquiries error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process enquiry request",
        },
      },
      { status: 500 }
    );
  }
}

