import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { EnquiryFormSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Simple Honeypot Check for Bot Abuse
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "Enquiry received successfully." }, // Deceptive success for bots
        { status: 200 }
      );
    }

    // Server-side validation
    const validation = EnquiryFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Map projectType to serviceType for database compatibility
    const enquiryData = {
      ...validation.data,
      serviceType: validation.data.projectType,
    };

    const enquiry = await Enquiry.create(enquiryData);

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    console.error("API enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
