import prisma from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headersList = headers();
    const userId = headersList.get("userId") || "";

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const students = await prisma.student.findMany({
      where: {
        userId: user.id,
      },
    });

    const events = await prisma.event.findMany({
      where: {
        userId: user.id,
      },
    });

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ user, students, events, certificates });
  } catch {
    return NextResponse.json(
      { message: "Error fetching profile" },
      { status: 404 }
    );
  }
}
