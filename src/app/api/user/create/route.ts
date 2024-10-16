import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, address, phone } = await req.json(); // Include email here
  const role = "RESIDENT";

  if (!name || !email || !address || !phone) {
    return NextResponse.json(
      { error: "Name, email, address, and phone are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
        phone,
        role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
