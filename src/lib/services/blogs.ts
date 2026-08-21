import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { cache } from "react";

export interface BlogItem {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    alt: string;
  };
  category: string;
  tags: string[];
  author: {
    name: string;
    id?: string;
  };
  status: string;
  publishedAt?: string;
  readTime: number;
  createdAt?: string;
}

interface RawBlogDoc {
  _id?: { toString(): string };
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
    alt: string;
  };
  category: string;
  tags?: string[];
  author?: {
    name: string;
    id?: { toString(): string };
  };
  status: string;
  publishedAt?: { toISOString(): string } | Date;
  createdAt?: { toISOString(): string } | Date;
  readTime: number;
}

function getISODate(val: Date | { toISOString(): string } | string | undefined): string {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString();
  if (typeof val === "object" && typeof val.toISOString === "function") {
    return val.toISOString();
  }
  if (typeof val === "string") return val;
  return "";
}

// Serializable plain object mapper
function serializeBlog(doc: RawBlogDoc): BlogItem {
  return {
    _id: doc._id?.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: {
      url: doc.coverImage?.url || "/images/hero/hotel-lobby.jpg",
      alt: doc.coverImage?.alt || doc.title,
    },
    category: doc.category,
    tags: doc.tags || [],
    author: {
      name: doc.author?.name || "THEDCO Advisory Team",
      id: doc.author?.id?.toString(),
    },
    status: doc.status,
    publishedAt: getISODate(doc.publishedAt) || getISODate(doc.createdAt),
    readTime: doc.readTime || 5,
    createdAt: getISODate(doc.createdAt),
  };
}

// Fallback high-end advisory mock articles
const MOCK_BLOGS: BlogItem[] = [
  {
    title: "Structuring Operations Before a Luxury Resort Launch",
    slug: "structuring-operations-luxury-resort-launch",
    excerpt: "A operational review checklist covering departmental hiring schedules, vendor onboarding logs, and pre-opening testing protocols for premium hotels.",
    content: `
# Structuring Operations Before a Luxury Resort Launch

Launching a luxury hotel or resort property requires more than marketing campaigns and interior design. Operational readiness—defined as the seamless orchestration of systems, staffing, vendor coordination, and SOP testing—determines the financial outcome of the launch.

At **THEDCO**, we advocate a structured pre-opening schedule that begins exactly 180 days before the opening date.

## 1. The 180-Day Pre-Opening Timeline
The critical path for operations setup is divided into three key phases:

* **Phase I (T-180 to T-120):** Operational structure definition, recruitment strategy, and finalization of departmental budgets.
* **Phase II (T-120 to T-60):** Vendor contracts, SOP design, and delivery of front office and kitchen equipment.
* **Phase III (T-60 to Launch):** Dry-run testing, guest service training, and opening simulation exercises.

## 2. Departmental SOP Implementation
Standard Operating Procedures (SOPs) must not be generalized templates. Every hotel project has unique physical layouts, pricing plans, and guest service targets. 

For the Front Office, SOPs must define:
* **The Arrival Sequence:** Valet, luggage handling, signature check-in, and guest profiling protocols.
* **Service Recovery Logs:** Clear authority limits for front desk managers to resolve complaints on-site without corporate delays.

For Food & Beverage outlets:
* **Kitchen Standard Recipes:** Precise weighing and cost sheets for every dish to control wastage.
* **Table Service Chronology:** Step-by-step table clearing, order taking, upselling, and billing workflows.

By enforcing structural controls early, owners prevent the typical post-opening service lag that damages brand reputation.
    `,
    coverImage: {
      url: "/images/hero/hotel-lobby.jpg",
      alt: "Luxury Resort Lobby",
    },
    category: "Operations",
    tags: ["Resorts", "Pre-Opening", "SOPs"],
    author: { name: "Manav Chandak" },
    status: "published",
    publishedAt: "2026-08-15T10:00:00.000Z",
    readTime: 6,
  },
  {
    title: "Menu Engineering: Maximizing Profits in Fine Dining",
    slug: "menu-engineering-maximizing-profits-fine-dining",
    excerpt: "How restaurant operators use margin analysis, design psychology, and portion controls to increase their beverage and food gross profit margins by up to 15%.",
    content: `
# Menu Engineering: Maximizing Profits in Fine Dining

Many restaurant operators view the menu simply as a price list. In reality, the menu is your primary sales tool. Every placement, font weight, description, and ingredient cost is a variable that can be engineered to maximize profitability.

## 1. Classifying Your Menu Items
Using classic menu engineering matrices, we categorize items into four distinct quadrants based on popularity (sales volume) and profitability (gross margin):

* **Stars (High Profit, High Popularity):** These are your signature dishes. Highlight them visually and maintain consistency.
* **Plowhorses (Low Profit, High Popularity):** Loved by guests but expensive to make. Subtly adjust portion size or integrate cheaper accompaniments to improve margins.
* **Puzzles (High Profit, Low Popularity):** Highly profitable but hard to sell. Rewrite descriptions, reposition on the page, or train waitstaff to push these items.
* **Dogs (Low Profit, Low Popularity):** Remove them from the menu immediately. They create clutter and waste kitchen prep hours.

## 2. Design Psychology
Where guests look on a menu is predictable. On a two-panel menu, the human eye starts in the center of the right page, moves to the top right, and then sweeps left. This is the **Golden Triangle**.

* **Place your Stars and Puzzles in these areas.**
* **Never use dotted lines linking items directly to prices.** This encourages guests to read down the price column and pick the cheapest option. Instead, nestle the price subtly below the item description using the same font weight.

By engineering cost sheets and applying these visual principles, restaurant operators can realize immediate improvement in their bottom line.
    `,
    coverImage: {
      url: "/images/services/fine-dining.jpg",
      alt: "Fine Dining Table",
    },
    category: "Restaurants",
    tags: ["Menu Engineering", "Cost Control", "F&B"],
    author: { name: "Manav Chandak" },
    status: "published",
    publishedAt: "2026-08-10T12:00:00.000Z",
    readTime: 5,
  },
];

export const getBlogs = cache(async (): Promise<BlogItem[]> => {
  try {
    await connectToDatabase();
    const docs = await Blog.find({ status: "published" }).sort({ publishedAt: -1 }).lean();
    if (!docs || docs.length === 0) {
      return MOCK_BLOGS;
    }
    return docs.map(serializeBlog);
  } catch (error) {
    console.warn("Failed to fetch blogs from database, using mock data fallback:", error);
    return MOCK_BLOGS;
  }
});

export const getBlogBySlug = cache(async (slug: string): Promise<BlogItem | null> => {
  try {
    await connectToDatabase();
    const doc = await Blog.findOne({ slug, status: "published" }).lean();
    if (!doc) {
      // Fallback search in mock data
      const mockMatch = MOCK_BLOGS.find((b) => b.slug === slug);
      return mockMatch || null;
    }
    return serializeBlog(doc);
  } catch (error) {
    console.warn("Failed to find blog by slug, searching mocks:", error);
    const mockMatch = MOCK_BLOGS.find((b) => b.slug === slug);
    return mockMatch || null;
  }
});
