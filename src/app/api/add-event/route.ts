import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, userId } = data;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    if (!event) {
      throw new Error("Error Creating event");
    }

    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json(
      { message: "Error Creating event" },
      { status: 404 }
    );
  }
}
