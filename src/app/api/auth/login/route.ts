import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { isRateLimited, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { handleApiError } from "@/lib/error";

const loginSchema = z
  .object({
    email: z.string().trim().email().lowercase(),
    password: z.string().min(1),
  })
  .strict();

export async function POST(req: Request) {
  const ip = await getClientIp();
  const failureLimitKey = `rate-limit:login-failures:${ip}`;

  try {
    // 1. Check if the IP is already rate-limited due to too many failed attempts
    const isLimited = isRateLimited(failureLimitKey, 5, 15 * 60 * 1000); // 5 failures per 15 mins
    if (isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Too many login attempts. Please try again later.",
          },
        },
        { status: 429 }
      );
    }

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

    // 3. Strict schema validation
    const parsed = loginSchema.parse(payload);
    const { email, password } = parsed;

    await connectToDatabase();

    // 4. Find admin by normalized email
    const admin = await Admin.findOne({ email });

    // Helper to log a failed attempt before returning
    const registerFailureAndRespond = async () => {
      await checkRateLimit(failureLimitKey, 5, 15 * 60 * 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid email or password",
          },
        },
        { status: 401 }
      );
    };

    // 5. Check isActive and admin presence
    if (!admin || !admin.isActive) {
      // Equalize timing profile of login failure for non-existent users by doing a dummy comparison
      const dummyHash = "$2a$12$DMIj9Q9G8d7J/T2e7m8q5u9W3z7S2n1K1G1u1t1e1s1t1P1a1s1s1";
      await verifyPassword(password, dummyHash);
      return registerFailureAndRespond();
    }

    // 6. Verify password using bcrypt
    const isPasswordCorrect = await verifyPassword(password, admin.passwordHash);
    if (!isPasswordCorrect) {
      return registerFailureAndRespond();
    }

    // 7. Update lastLoginAt on successful login
    admin.lastLoginAt = new Date();
    await admin.save();

    // 8. Create secure session and set HTTP-only cookie
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
    return handleApiError(error);
  }
}
