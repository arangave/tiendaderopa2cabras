const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Categorías
  let rebeldes = await prisma.categoria.upsert({
    where: { nombre: "Cabras Rebeldes" },
    update: {},
    create: {
      nombre: "Cabras Rebeldes",
      descripcion: "Ropa para cabras con cuernos y actitud. Adultos rebeldes."
    }
  });

  let traviesas = await prisma.categoria.upsert({
    where: { nombre: "Cabras Traviesas" },
    update: {},
    create: {
      nombre: "Cabras Traviesas",
      descripcion: "Prendas para peques que saltan las normas. Niños/as traviesos/as."
    }
  });

  // 2. Productos CAMISETAS
  const camisetas = [
    {
      nombre: "Camiseta Cuernos Amarillos",
      descripcion: "Oversize y actitud. Para cabras adultas que no temen destacar. (Disponible también para peques traviesos/as)",
      precio: 29.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-amarilla-de-corte-oversize.png"
      ],
      colores: [
        { nombre: "Amarillo", hex: "#ffe23d", imagenUrl: "/images/prendas/camisetas/camiseta-amarilla-de-corte-oversize.png" },
        { nombre: "Gris", hex: "#cccccc", imagenUrl: "/images/prendas/camisetas/camiseta-gris-oversized-en-fondo-blanco.png" },
        { nombre: "Azul Claro", hex: "#58c3fa", imagenUrl: "/images/prendas/camisetas/camiseta-azul-clara-sobre-fondo-blanco-(1).png" }
      ]
    },
    {
      nombre: "Camiseta Cuernos Bicolor",
      descripcion: "¿Una sola actitud? ¡Nunca! Bicolor y sarcástica, para cabras doblemente diferentes.",
      precio: 31.5,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-bicolor-verde-oscuro-y-roja-palooversize.png"
      ],
      colores: [
        { nombre: "Verde Oscuro", hex: "#1b4332", imagenUrl: "/images/prendas/camisetas/camiseta-bicolor-verde-oscuro-y-roja-palooversize.png" },
        { nombre: "Rojo Palo", hex: "#c1121f", imagenUrl: "/images/prendas/camisetas/camiseta-bicolor-verde-oscuro-y-roja-palooversize.png" }
      ]
    },
    {
      nombre: "Camiseta Sarcástica Pastel",
      descripcion: "Dulce por fuera, cabra por dentro. Para quien sonríe mientras rompe las reglas.",
      precio: 28.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-rosa-pastel-apretada.png"
      ],
      colores: [
        { nombre: "Rosa Pastel", hex: "#f9bec7", imagenUrl: "/images/prendas/camisetas/camiseta-rosa-pastel-apretada.png" },
        { nombre: "Amarillo Pastel", hex: "#ffeaa7", imagenUrl: "/images/prendas/camisetas/camiseta-amarilla-pastel-de-corte-apretado.png" }
      ]
    },
    {
      nombre: "Camiseta Azul 'No Pastores'",
      descripcion: "El azul de las cabras que se escapan del redil. Oversize y lista para saltar cualquier cerca.",
      precio: 27.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-azul-suave-sobre-oversize.png"
      ],
      colores: [
        { nombre: "Azul Suave", hex: "#89c2d9", imagenUrl: "/images/prendas/camisetas/camiseta-azul-suave-sobre-oversize.png" },
        { nombre: "Azul Navy", hex: "#001f54", imagenUrl: "/images/prendas/camisetas/camiseta-azul-navy-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Multicolor 4 Cuernos",
      descripcion: "Para cabras con más personalidad que colores. 4 tonos, 0 límites.",
      precio: 34.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png"
      ],
      colores: [
        { nombre: "Amarillo", hex: "#ffe23d", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" },
        { nombre: "Azul", hex: "#58c3fa", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" },
        { nombre: "Verde", hex: "#a7ff83", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" },
        { nombre: "Naranja Coral", hex: "#ffb085", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Ironía Minimal",
      descripcion: "Minimalismo, sí. Aburrimiento, nunca. Elige tu gris favorito y da el salto.",
      precio: 25.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-gris-heather-oversize.png"
      ],
      colores: [
        { nombre: "Gris Heather", hex: "#d9d9d9", imagenUrl: "/images/prendas/camisetas/camiseta-gris-heather-oversize.png" },
        { nombre: "Gris Carbón", hex: "#3c3c3c", imagenUrl: "/images/prendas/camisetas/camiseta-gris-carbón-de-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Gradiente Morado",
      descripcion: "Cabras que cambian de color según el día... y siempre llevan cuernos.",
      precio: 33.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-de-gradiente-morado-y-turquesa-oversize.png"
      ],
      colores: [
        { nombre: "Morado", hex: "#a084ee", imagenUrl: "/images/prendas/camisetas/camiseta-de-gradiente-morado-y-turquesa-oversize.png" },
        { nombre: "Turquesa", hex: "#5eead4", imagenUrl: "/images/prendas/camisetas/camiseta-de-gradiente-morado-y-turquesa-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Coral Traviesa",
      descripcion: "Para peques o adultos que dejan huella. Nadie olvida a la cabra del coral.",
      precio: 28.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-coral-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Coral", hex: "#ffb085", imagenUrl: "/images/prendas/camisetas/camiseta-coral-sobre-fondo-blanco.png" }
      ]
    }
  ];

  // 3. Productos SUDADERAS
  const sudaderas = [
    {
      nombre: "Sudadera Cuernos Amarillos",
      descripcion: "Para rebeldes que no pasan frío, ni desapercibidos. (Disponible en versión peques traviesos/as)",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-amarilla-pastel-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Amarillo Pastel", hex: "#ffeaa7", imagenUrl: "/images/prendas/sudaderas/sudadera-amarilla-pastel-sobre-fondo-blanco.png" },
        { nombre: "Blanco", hex: "#ffffff", imagenUrl: "public/images/prendas/sudaderas/sudadera-blanca-de-corte-oversize-(1).png" }
      ]
    },
    {
      nombre: "Sudadera Traviesa Azul",
      descripcion: "Para cabras que saltan charcos y reglas. Tono azul para días de actitud.",
      precio: 42.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-azul-navy-oversize.png"
      ],
      colores: [
        { nombre: "Azul Navy", hex: "#001f54", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-navy-oversize.png" },
        { nombre: "Azul Marino", hex: "#203562", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-marino-oversize.png" }
      ]
    },
    {
      nombre: "Sudadera Minimal Gris",
      descripcion: "Para rebeldes discretos. No todos los cuernos hacen ruido.",
      precio: 38.5,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-gris-clara-de-corte-oversize.png"
      ],
      colores: [
        { nombre: "Gris Claro", hex: "#ececec", imagenUrl: "/images/prendas/sudaderas/sudadera-gris-clara-de-corte-oversize.png" },
        { nombre: "Gris Heather", hex: "#d9d9d9", imagenUrl: "/images/prendas/sudaderas/sudadera-gris-heather-con-cuello-redondo.png" }
      ]
    },
    {
      nombre: "Sudadera Coral Alegre",
      descripcion: "El color de las cabras que primero llegan... y se quedan con el mejor sitio.",
      precio: 41.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-coral-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Coral", hex: "#ffb085", imagenUrl: "/images/prendas/sudaderas/sudadera-coral-sobre-fondo-blanco.png" }
      ]
    },
    {
      nombre: "Sudadera Verde Pastel",
      descripcion: "Ideal para saltos de actitud, tanto para peques como para adultos con flow.",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-verde-pastel-en-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Verde Pastel", hex: "#b7efc5", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-pastel-en-fondo-blanco.png" }
      ]
    },
    {
      nombre: "Sudadera Burdeos Cuernos",
      descripcion: "Cabras sofisticadas. Rebeldía con clase.",
      precio: 44.5,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-burdeos-de-corte-oversize.png"
      ],
      colores: [
        { nombre: "Burdeos", hex: "#801336", imagenUrl: "/images/prendas/sudaderas/sudadera-burdeos-de-corte-oversize.png" },
        { nombre: "Burgundy", hex: "#900020", imagenUrl: "/images/prendas/sudaderas/sudadera-burgundy-sobre-fondo-blanco.png" }
      ]
    },
    {
      nombre: "Sudadera Verde Menta Amplia",
      descripcion: "La sudadera de las cabras frescas. Oversize, actitud, y menta en vena.",
      precio: 40.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-verde-menta-de-corte-amplio.png"
      ],
      colores: [
        { nombre: "Verde Menta", hex: "#aee9d1", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-menta-de-corte-amplio.png" }
      ]
    },
    {
      nombre: "Sudadera Marrón Holgada",
      descripcion: "Para cabras urbanas con espíritu rural. Marrón, cuernos y humor irónico.",
      precio: 40.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-marrón-de-corte-holgado.png"
      ],
      colores: [
        { nombre: "Marrón", hex: "#6f4e37", imagenUrl: "/images/prendas/sudaderas/sudadera-marrón-de-corte-holgado.png" }
      ]
    }
  ];

  // 4. Crea los productos para ambas categorías
  for (const prod of camisetas) {
    await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion + " (Adulto Rebelde)",
        precio: prod.precio,
        tipo: prod.tipo,
        categoriaId: rebeldes.id,
        imagenes: { create: prod.imagenes.map(url => ({ url })) },
        colores: {
          create: prod.colores
        }
      }
    });
    await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion + " (Peques Traviesos/as)",
        precio: prod.precio,
        tipo: prod.tipo,
        categoriaId: traviesas.id,
        imagenes: { create: prod.imagenes.map(url => ({ url })) },
        colores: {
          create: prod.colores
        }
      }
    });
  }

  for (const prod of sudaderas) {
    await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion + " (Adulto Rebelde)",
        precio: prod.precio,
        tipo: prod.tipo,
        categoriaId: rebeldes.id,
        imagenes: { create: prod.imagenes.map(url => ({ url })) },
        colores: {
          create: prod.colores
        }
      }
    });
    await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion + " (Peques Traviesos/as)",
        precio: prod.precio,
        tipo: prod.tipo,
        categoriaId: traviesas.id,
        imagenes: { create: prod.imagenes.map(url => ({ url })) },
        colores: {
          create: prod.colores
        }
      }
    });
  }

  console.log("¡Seed de camisetas y sudaderas 2Cabras creado con éxito! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
