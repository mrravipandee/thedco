import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { createEnquirySchema } from "@/lib/validations/enquiry";
import Enquiry from "@/models/Enquiry";

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
