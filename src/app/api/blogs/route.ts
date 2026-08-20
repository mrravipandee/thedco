import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { requireAuth, AuthError } from "@/lib/auth/require-auth";
import { getSession } from "@/lib/auth/session";
import { createBlogSchema } from "@/lib/validations/blog";
import { BLOG_STATUSES, BLOG_CATEGORIES } from "@/types/blog";

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface LeanBlogList {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: { url: string; alt: string };
  category: string;
  tags: string[];
  author: { name: string; id?: string };
  status: string;
  publishedAt?: Date;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

// POST /api/blogs - Create Blog Post (Protected: Admin/Editor)
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
    const parsed = createBlogSchema.safeParse(payload);
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

    const blogData = parsed.data;

    await connectToDatabase();

    // 4. Verify slug uniqueness
    const existingBlog = await Blog.findOne({ slug: blogData.slug });
    if (existingBlog) {
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

    // 5. Apply publishing date logic
    let publishedAt = blogData.publishedAt;
    if (blogData.status === "published" && !publishedAt) {
      publishedAt = new Date();
    }

    // 6. Create blog post
    const blog = await Blog.create({
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      coverImage: blogData.coverImage,
      category: blogData.category,
      tags: blogData.tags,
      author: blogData.author,
      status: blogData.status,
      publishedAt,
      readTime: blogData.readTime,
      seo: blogData.seo,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: blog._id.toString(),
          slug: blog.slug,
          status: blog.status,
        },
        message: "Blog created successfully",
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

    console.error("API POST create blog error:", error);
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

// GET /api/blogs - List Blog Posts (Public & CMS Admin)
export async function GET(req: Request) {
  try {
    // 1. Check if user is authenticated for Admin view
    const session = await getSession();
    const isAdmin = !!session;

    const { searchParams } = new URL(req.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "12", 10);
    const statusParam = searchParams.get("status");
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limit = isNaN(limitParam) || limitParam < 1 ? 12 : Math.min(limitParam, 100);

    // Build DB Query conditions
    const query: {
      status?: string;
      category?: string;
      $or?: Array<Record<string, RegExp>>;
    } = {};

    // 2. Enforce visibility permissions (public sees only published)
    if (!isAdmin) {
      query.status = "published";
    } else if (statusParam) {
      // Validate status query parameter
      if (!BLOG_STATUSES.includes(statusParam as (typeof BLOG_STATUSES)[number])) {
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

    // 3. Category filter validation
    if (categoryParam) {
      if (!BLOG_CATEGORIES.includes(categoryParam as (typeof BLOG_CATEGORIES)[number])) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid category query value",
            },
          },
          { status: 422 }
        );
      }
      query.category = categoryParam;
    }

    // 4. Safe Search
    if (searchParam) {
      const truncated = searchParam.trim().substring(0, 50);
      if (truncated) {
        const escaped = escapeRegex(truncated);
        const searchRegex = new RegExp(escaped, "i");
        query.$or = [
          { title: searchRegex },
          { excerpt: searchRegex },
          { category: searchRegex },
          { tags: searchRegex },
        ];
      }
    }

    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Sorting: publishedAt desc (for public) or createdAt desc (for admin lists)
    const sortOption: Record<string, 1 | -1> = !isAdmin
      ? { publishedAt: -1 }
      : { createdAt: -1 };

    // Fetch lightweight list omitting the complete blog content
    const [total, blogs] = await Promise.all([
      Blog.countDocuments(query),
      Blog.find(query)
        .select("-content")
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const transformedBlogs = (blogs as unknown as LeanBlogList[]).map((blog) => {
      return {
        id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        coverImage: blog.coverImage,
        category: blog.category,
        tags: blog.tags,
        author: blog.author,
        status: blog.status,
        publishedAt: blog.publishedAt,
        readTime: blog.readTime,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      };
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        data: transformedBlogs,
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
    console.error("API GET list blogs error:", error);
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
