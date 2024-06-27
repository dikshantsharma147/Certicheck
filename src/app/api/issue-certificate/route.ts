import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { eventId, studentId, userId } = data;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
      },
      select: {
        id: true,
        Certificate: true,
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    if (student) {
      if (student.Certificate.find((cert) => cert.eventID === eventId)) {
        throw new Error("Certificate already issued");
      }
    }

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    const certificate = await prisma.certificate.create({
      data: {
        eventID: eventId,
        studentID: studentId,
        userId: userId,
      },
    });

    if (!certificate) {
      throw new Error("Server Error, Please try again later");
    }

    return NextResponse.json(certificate);
  } catch (error: Error | any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
