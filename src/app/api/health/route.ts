import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    // Check Mongoose connection state (1 = connected)
    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Database connection failed",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check database connection failure:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Database connection failed",
        },
      },
      { status: 500 }
    );
  }
}
