import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req, res) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));
  const data = await req.json();

  try {
    const findata = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findata) {
      return NextResponse.json({
        message: " invalid id",
      });
    }

    const updateUser = await prisma.user.update({
      where: { id: id },
      data: data,
    });
    return NextResponse.json({
      status: true,
      message: "data updated success",
      updateUser,
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message,
    });
  }
}

export async function GET(req, res) {
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
        message: "data not found or  invalid id",
      });
    }
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
