import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");

    await connectToDatabase();

    if (slug) {
      const project = await Project.findOne({ slug });
      if (!project) {
        return NextResponse.json(
          { success: false, error: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: project });
    }

    const query: { featured?: boolean } = {};
    if (featured === "true") {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("API projects query error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
