import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API logout error:", error);
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
