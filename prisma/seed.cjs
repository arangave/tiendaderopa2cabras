const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Buscar o crear categoría "Cabras Rebeldes"
  let categoriaRebeldes = await prisma.categoria.findFirst({
    where: { nombre: "Cabras Rebeldes" },
  });
  if (!categoriaRebeldes) {
    categoriaRebeldes = await prisma.categoria.create({
      data: {
        nombre: "Cabras Rebeldes",
        descripcion: "Camisetas y sudaderas con estilo rebelde",
      },
    });
  }

  // Buscar o crear categoría "Cabras Traviesas"
  let categoriaTraviesas = await prisma.categoria.findFirst({
    where: { nombre: "Cabras Traviesas" },
  });
  if (!categoriaTraviesas) {
    categoriaTraviesas = await prisma.categoria.create({
      data: {
        nombre: "Cabras Traviesas",
        descripcion: "Ropa divertida para peques con actitud",
      },
    });
  }

  // Crear productos para "Cabras Rebeldes"
  for (let i = 1; i <= 3; i++) {
    await prisma.producto.create({
      data: {
        nombre: `Camiseta Rebelde ${i}`,
        descripcion: `Camiseta exclusiva de la colección Cabras Rebeldes - Modelo ${i}`,
        precio: 29.99 + i,
        categoriaId: categoriaRebeldes.id,
        imagenes: {
          create: [
            { url: "/images/Backside T-Shirt Mockup.png" },
            { url: "/images/camiseta-doblada-adelante.png" },
          ],
        },
        colores: {
          create: [
            {
              nombre: "Negro",
              hex: "#000000",
              imagenUrl: "/images/Backside T-Shirt Mockup.png",
            },
            {
              nombre: "Blanco",
              hex: "#ffffff",
              imagenUrl: "/images/camiseta-blanca.png",
            },
          ],
        },
      },
    });
  }

  // Crear productos para "Cabras Traviesas"
  for (let i = 1; i <= 3; i++) {
    await prisma.producto.create({
      data: {
        nombre: `Camiseta Traviesa ${i}`,
        descripcion: `Camiseta divertida para peques con actitud - Modelo ${i}`,
        precio: 19.99 + i,
        categoriaId: categoriaTraviesas.id,
        imagenes: {
          create: [
            { url: "/images/Backside T-Shirt Mockup.png" },
            { url: "/images/camiseta-doblada-adelante.png" },
          ],
        },
        colores: {
          create: [
            {
              nombre: "Negro",
              hex: "#000000",
              imagenUrl: "/images/Backside T-Shirt Mockup.png",
            },
            {
              nombre: "Blanco",
              hex: "#ffffff",
              imagenUrl: "/images/camiseta-blanca.png",
            },
          ],
        },
      },
    });
  }

  console.log("Datos de productos y categorías insertados con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
