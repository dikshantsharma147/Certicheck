import prisma from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headerList = headers();
    const certificateId = headerList.get("certificateId");
    const certificate = await prisma.certificate.findFirst({
      where: {
        id: certificateId!,
      },
    });

    if (!certificate) {
      throw new Error("Certificate not valid");
    }

    const owner = await prisma.user.findFirst({
      where: {
        id: certificate.userId!,
      },
    });

    const student = await prisma.student.findFirst({
      where: {
        id: certificate.studentID!,
      },
    });

    const event = await prisma.event.findFirst({
      where: {
        id: certificate.eventID!,
      },
    });

    return NextResponse.json({ owner, student, event, certificate });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
