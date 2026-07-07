import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Error in GET /api/devices:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}