import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const prisma = new PrismaClient();

  try {
    const findata = await prisma.user.findMany();

    return NextResponse.json({
      status: true,
      data: findata,
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message,
    });
  }
}
