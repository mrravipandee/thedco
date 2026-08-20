import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().trim().email().lowercase(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    // 1. Parse request body
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

    // 2. Validate email and password inputs
    const parsed = loginSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    }

    const { email, password } = parsed.data;

    // Connect to database
    await connectToDatabase();

    // 3. Find admin by normalized email
    const admin = await Admin.findOne({ email });

    // 4. Check isActive and admin presence
    if (!admin || !admin.isActive) {
      // Equalize timing profile of login failure for non-existent users by doing a dummy comparison
      const dummyHash = "$2a$12$DMIj9Q9G8d7J/T2e7m8q5u9W3z7S2n1K1G1u1t1e1s1t1P1a1s1s1";
      await verifyPassword(password, dummyHash);

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    }

    // 5. Verify password using bcrypt
    const isPasswordCorrect = await verifyPassword(password, admin.passwordHash);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    }

    // 6. Update lastLoginAt
    admin.lastLoginAt = new Date();
    await admin.save();

    // 7 & 8. Create secure session and set HTTP-only cookie
    await createSession({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    // 9. Return safe user information (excluding password/hash)
    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API login error:", error);
    // Generic 500 response, avoiding leaks of database details or stack traces
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
