import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: Product = await request.json(); 

  const existingProduct = await prisma.product.findFirst({
    where: {
      title: body.title,
    },
  });

  if (existingProduct) {
    return NextResponse.json(
      { error: "You added product that already exists!" },
      { status: 409 }
    );
  }

  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });

  return NextResponse.json(product, { status: 201 });
};
