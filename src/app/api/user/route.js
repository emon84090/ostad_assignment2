import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const prisma = new PrismaClient();

  const data = await req.json();
  try {
    const result = await prisma.user.create({
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

export async function DELETE(req, res) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));

  try {
    const findata = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findata) {
      return NextResponse.json({
        message: "data not found ,invalid id",
      });
    }

    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (result) {
      return NextResponse.json({
        message: "data deleted success",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message,
    });
  }
}
