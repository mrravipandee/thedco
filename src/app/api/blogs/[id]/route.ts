import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth, requireAdmin, AuthError } from "@/lib/auth/require-auth";
import { updateBlogSchema } from "@/lib/validations/blog";

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

interface LeanBlogDetail {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: { url: string; alt: string };
  category: string;
  tags: string[];
  author: { name: string; id?: string };
  status: string;
  publishedAt?: Date;
  readTime: number;
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

// GET /api/blogs/[id] - Get Complete Blog Post (Protected: Admin/Editor)
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
            message: "Invalid blog ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Query Database
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Blog not found",
          },
        },
        { status: 404 }
      );
    }

    const doc = blog as unknown as LeanBlogDetail;

    // 4. Transform response replacing _id with id
    const transformed = {
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      content: doc.content,
      coverImage: doc.coverImage,
      category: doc.category,
      tags: doc.tags,
      author: doc.author,
      status: doc.status,
      publishedAt: doc.publishedAt,
      readTime: doc.readTime,
      seo: doc.seo,
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

    console.error("API GET blog by ID error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process blog request",
        },
      },
      { status: 500 }
    );
  }
}

// PATCH /api/blogs/[id] - Update Blog Post (Protected: Admin/Editor)
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
            message: "Invalid blog ID",
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

    // 4. Validate partial data
    const parsed = updateBlogSchema.safeParse(payload);
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
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Blog not found",
          },
        },
        { status: 404 }
      );
    }

    // 6. Check unique slug conflict if modified
    if (updates.slug && updates.slug !== blog.slug) {
      const duplicate = await Blog.findOne({ slug: updates.slug, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "A blog with this slug already exists",
            },
          },
          { status: 409 }
        );
      }
    }

    // 7. Apply status changes and publishing logic
    if (updates.status) {
      if (updates.status === "published" && !blog.publishedAt && !updates.publishedAt) {
        blog.publishedAt = new Date();
      }
      blog.status = updates.status;
    }

    // 8. Apply remaining validated updates
    if (updates.title) blog.title = updates.title;
    if (updates.slug) blog.slug = updates.slug;
    if (updates.excerpt) blog.excerpt = updates.excerpt;
    if (updates.content) blog.content = updates.content;
    if (updates.coverImage) blog.coverImage = updates.coverImage;
    if (updates.category) blog.category = updates.category;
    if (updates.tags) blog.tags = updates.tags;
    if (updates.author) blog.author = updates.author;
    if (updates.publishedAt) blog.publishedAt = updates.publishedAt;
    if (updates.readTime) blog.readTime = updates.readTime;
    if (updates.seo) blog.seo = updates.seo;

    await blog.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: blog._id.toString(),
          slug: blog.slug,
          status: blog.status,
          publishedAt: blog.publishedAt,
        },
        message: "Blog updated successfully",
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

    console.error("API PATCH update blog error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process blog request",
        },
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete Blog Post (Protected: Admin Only)
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
            message: "Invalid blog ID",
          },
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 3. Delete document
    const result = await Blog.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Blog not found",
          },
        },
        { status: 404 }
      );
    }

    // 4. Return success (do not return the deleted document)
    return NextResponse.json(
      {
        success: true,
        message: "Blog deleted successfully",
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

    console.error("API DELETE blog error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unable to process blog request",
        },
      },
      { status: 500 }
    );
  }
}
