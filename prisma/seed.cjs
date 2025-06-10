const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Categorías
  let categoriaRebeldes = await prisma.categoria.findFirst({ where: { nombre: "Cabras Rebeldes" } });
  if (!categoriaRebeldes) {
    categoriaRebeldes = await prisma.categoria.create({
      data: {
        nombre: "Cabras Rebeldes",
        descripcion: "Camisetas y sudaderas con estilo rebelde",
      },
    });
  }

  let categoriaTraviesas = await prisma.categoria.findFirst({ where: { nombre: "Cabras Traviesas" } });
  if (!categoriaTraviesas) {
    categoriaTraviesas = await prisma.categoria.create({
      data: {
        nombre: "Cabras Traviesas",
        descripcion: "Ropa divertida para peques con actitud",
      },
    });
  }

  // Limpia productos previos para evitar duplicados (opcional)
  await prisma.producto.deleteMany();

  // PRODUCTOS CABRAS REBELDES
  await prisma.producto.create({
    data: {
      nombre: "Camiseta Rebelde Amarilla",
      tipo: "Camiseta",
      descripcion: "Camiseta oversize para rebeldes que buscan destacar con color y actitud.",
      precio: 29.95,
      categoriaId: categoriaRebeldes.id,
      imagenes: {
        create: [
          { url: "/images/prendas/rebelde/camisetas/Camiseta amarilla de corte oversize.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Amarillo",
            hex: "#ffe23d",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta amarilla de corte oversize.png",
          },
          {
            nombre: "Azul claro",
            hex: "#58c3fa",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta azul clara sobre fondo blanco.png",
          },
          {
            nombre: "Gris",
            hex: "#cccccc",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta gris oversized en fondo blanco.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Camiseta Rebelde Bicolor",
      tipo: "Camiseta",
      descripcion: "Estilo pastel y bicolor para rebeldes con gusto por lo diferente.",
      precio: 31.5,
      categoriaId: categoriaRebeldes.id,
      imagenes: {
        create: [
          { url: "/images/prendas/rebelde/camisetas/Camiseta bicolor pastel sobre fondo blanco.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Bicolor Pastel",
            hex: "#ffd6e0",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta bicolor pastel sobre fondo blanco.png",
          },
          {
            nombre: "Gris Jaspeada",
            hex: "#c9c9c9",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta gris jaspeada en primer plano.png",
          },
          {
            nombre: "Rojo",
            hex: "#c71e1e",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta roja de corte oversized.png",
          },
          {
            nombre: "Azul Royal",
            hex: "#3575c6",
            imagenUrl: "/images/prendas/rebelde/camisetas/Camiseta azul royal de algodón.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Sudadera Rebelde Carbón",
      tipo: "Sudadera",
      descripcion: "Sudadera de corte amplio y gris carbón para rebeldes clásicos.",
      precio: 44.9,
      categoriaId: categoriaRebeldes.id,
      imagenes: {
        create: [
          { url: "/images/prendas/rebelde/sudaderas/Sudadera gris carbón de corte ancho.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Gris Carbón",
            hex: "#2d2d2d",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera gris carbón de corte ancho.png",
          },
          {
            nombre: "Negro",
            hex: "#000000",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera negra oversize.png",
          },
          {
            nombre: "Azul Suave",
            hex: "#87bfff",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera azul suave sobre fondo blanco.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Sudadera Rebelde Bloques",
      tipo: "Sudadera",
      descripcion: "Para rebeldes creativos: sudadera con bloques de color pastel.",
      precio: 47.75,
      categoriaId: categoriaRebeldes.id,
      imagenes: {
        create: [
          { url: "/images/prendas/rebelde/sudaderas/Sudadera bloqueada en colores pastel.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Pastel Bloques",
            hex: "#ffaec9",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera bloqueada en colores pastel.png",
          },
          {
            nombre: "Blanco Detalles",
            hex: "#ffffff",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera blanca con detalles pastel.png",
          },
          {
            nombre: "Morado",
            hex: "#a084ee",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera de gradiente morado y turquesa.png",
          },
          {
            nombre: "Gris",
            hex: "#cccccc",
            imagenUrl: "/images/prendas/rebelde/sudaderas/Sudadera gris oversized en fondo blanco.png",
          },
        ],
      },
    },
  });

  // PRODUCTOS CABRAS TRAVIESAS
  await prisma.producto.create({
    data: {
      nombre: "Camiseta Traviesa Rosa",
      tipo: "Camiseta",
      descripcion: "Camiseta cómoda y divertida para peques llenos de energía.",
      precio: 19.95,
      categoriaId: categoriaTraviesas.id,
      imagenes: {
        create: [
          { url: "/images/prendas/traviesa/camisetas/Camiseta rosa de algodón para niñas.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Rosa",
            hex: "#ff5fa2",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta rosa de algodón para niñas.png",
          },
          {
            nombre: "Naranja",
            hex: "#ffa23a",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta naranja para peques.png",
          },
          {
            nombre: "Verde Pastel",
            hex: "#b2f7c3",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta verde pastel para niños.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Camiseta Traviesa Sonrisas",
      tipo: "Camiseta",
      descripcion: "Sonrisas y colores para el día a día de las cabras más pequeñas.",
      precio: 22.95,
      categoriaId: categoriaTraviesas.id,
      imagenes: {
        create: [
          { url: "/images/prendas/traviesa/camisetas/Camiseta amarilla de algodón para niños.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Amarillo",
            hex: "#ffe23d",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta amarilla de algodón para niños.png",
          },
          {
            nombre: "Verde",
            hex: "#27ae60",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta verde para niños.png",
          },
          {
            nombre: "Celeste",
            hex: "#58c3fa",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta celeste para niños.png",
          },
          {
            nombre: "Blanco",
            hex: "#ffffff",
            imagenUrl: "/images/prendas/traviesa/camisetas/Camiseta blanca para peques.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Sudadera Traviesa Saltos",
      tipo: "Sudadera",
      descripcion: "Para peques saltarines, sudadera cómoda y lista para la aventura.",
      precio: 31.9,
      categoriaId: categoriaTraviesas.id,
      imagenes: {
        create: [
          { url: "/images/prendas/traviesa/sudaderas/Sudadera azul para niños.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Azul",
            hex: "#58c3fa",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera azul para niños.png",
          },
          {
            nombre: "Rosa",
            hex: "#ff5fa2",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera rosa para niñas.png",
          },
          {
            nombre: "Naranja",
            hex: "#ffa23a",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera naranja para niños.png",
          },
          {
            nombre: "Verde",
            hex: "#27ae60",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera verde para niños.png",
          },
        ],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Sudadera Traviesa Fiesta",
      tipo: "Sudadera",
      descripcion: "Sudadera multicolor para las peques más alegres.",
      precio: 34.5,
      categoriaId: categoriaTraviesas.id,
      imagenes: {
        create: [
          { url: "/images/prendas/traviesa/sudaderas/Sudadera multicolor para niñas.png" },
        ],
      },
      colores: {
        create: [
          {
            nombre: "Rosa Fiesta",
            hex: "#ff5fa2",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera multicolor para niñas.png",
          },
          {
            nombre: "Amarillo",
            hex: "#ffe23d",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera amarilla para niñas.png",
          },
          {
            nombre: "Celeste",
            hex: "#58c3fa",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera celeste para niñas.png",
          },
          {
            nombre: "Blanco",
            hex: "#ffffff",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera blanca para peques.png",
          },
          {
            nombre: "Verde",
            hex: "#27ae60",
            imagenUrl: "/images/prendas/traviesa/sudaderas/Sudadera verde para niñas.png",
          },
        ],
      },
    },
  });

  console.log("Productos y colores insertados con imágenes reales del zip.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
