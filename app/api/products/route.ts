import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        colores: true,
        imagenes: true,
      },
    });
    return NextResponse.json(productos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
