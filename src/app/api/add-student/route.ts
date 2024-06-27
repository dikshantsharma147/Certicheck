import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, name, rollNo } = data;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    const student = await prisma.student.create({
      data: {
        name: name,
        rollNo: rollNo,
        userId: userId,
      },
    });
    if (!student) {
      throw new Error("Server Error, Please try after some time");
    }

    return NextResponse.json(student);
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
