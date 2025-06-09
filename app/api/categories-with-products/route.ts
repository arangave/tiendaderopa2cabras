import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";  // Asegúrate que el path a tu prisma client es correcto

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: {
          include: {
            imagenes: true,
            colores: true,
          },
        },
      },
    });

    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Error fetching categories and products:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
