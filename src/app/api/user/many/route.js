import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const prisma = new PrismaClient();

  const data = await req.json();
  try {
    const result = await prisma.user.createMany({
      data: data,
    });
    if (result) {
      return NextResponse.json({ message: "data insert success", result });
    }
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message,
    });
  }
}
