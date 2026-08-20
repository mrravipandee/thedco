import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: {
            authenticated: false,
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          authenticated: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API session retrieval error:", error);
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
