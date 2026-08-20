import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { requireAuth, requireAdmin, AuthError } from "@/lib/auth/require-auth";
import { updateEnquirySchema } from "@/lib/validations/enquiry";

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
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

// GET /api/enquiries/[id] - Authenticated (Admin/Editor)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user
    await requireAuth();

    const { id } = await params;

    // 2. Validate ObjectId format
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid enquiry ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Query Database
    const enquiry = await Enquiry.findById(id).lean();
    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Enquiry not found",
          },
        },
        { status: 404 }
      );
    }

    // 4. Transform response replacing _id with id and excluding internal fields
    const doc = enquiry as unknown as LeanEnquiry;
    const transformed = {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      company: doc.company,
      projectType: doc.projectType,
      location: doc.location,
      projectStage: doc.projectStage,
      businessStatus: doc.businessStatus,
      message: doc.message,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
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

    console.error("API GET single enquiry error:", error);
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

// PATCH /api/enquiries/[id] - Authenticated (Admin/Editor)
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
            message: "Invalid enquiry ID",
          },
        },
        { status: 400 }
      );
    }

    // 3. Parse and validate request body
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

    const parsed = updateEnquirySchema.safeParse(payload);
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

    const { status } = parsed.data;

    await connectToDatabase();

    // 4. Update enquiry status in database
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Enquiry not found",
          },
        },
        { status: 404 }
      );
    }

    enquiry.status = status;
    await enquiry.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: enquiry._id.toString(),
          status: enquiry.status,
        },
        message: "Enquiry updated successfully",
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

    console.error("API PATCH enquiry error:", error);
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

// DELETE /api/enquiries/[id] - Authenticated (Admin Only)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authorize as Admin (Editors cannot delete)
    await requireAdmin();

    const { id } = await params;

    // 2. Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid enquiry ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Delete from database
    const result = await Enquiry.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Enquiry not found",
          },
        },
        { status: 404 }
      );
    }

    // 4. Return success (do not return the deleted document)
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry deleted successfully",
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

    console.error("API DELETE enquiry error:", error);
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

