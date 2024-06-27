import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
