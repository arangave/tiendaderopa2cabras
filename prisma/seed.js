const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Categorías
  const rebeldes = await prisma.categoria.upsert({
    where: { nombre: "Cabras Rebeldes" },
    update: {},
    create: {
      nombre: "Cabras Rebeldes",
      descripcion: "Ropa para cabras con cuernos y actitud. Adultos rebeldes."
    }
  });
  const traviesas = await prisma.categoria.upsert({
    where: { nombre: "Cabras Traviesas" },
    update: {},
    create: {
      nombre: "Cabras Traviesas",
      descripcion: "Prendas para peques que saltan las normas. Niños/as traviesos/as."
    }
  });

  // ===================== CAMISETAS ===================== //
  const camisetas = [
       {
      nombre: "Camiseta Multicolor 4 Cuernos",
      descripcion: "Más personalidad que colores. 4 tonos, 0 límites.",
      precio: 34.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png",
        "/images/prendas/camisetas/camiseta-4colores-blanco-morado-azul-y-amarillo-oversize.png",
        "/images/prendas/camisetas/camiseta-4colores-verde-naranja-amarillo-y-azul-oversize.png"
      ],
      colores: [
        { nombre: "Amarillo/Azul/Verde/Naranja Coral", hex: "#ffe23d/#58c3fa/#ffb085/#a7ff83", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" },
        { nombre: "Blanco/Morado/Amarillo/Azul", hex: "#fff/#b384ff/#ffe23d/#38a1db", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-blanco-morado-azul-y-amarillo-oversize.png" },
        { nombre: "Verde/Naranja/Azul/Amarillo", hex: "#a7ff83/#ffb085/#58c3fa/#ffe23d", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-verde-naranja-amarillo-y-azul-oversize.png" }
      ]
    },
       
    
    {
      nombre: "Camiseta Azul Family Oversize",
      descripcion: "Azul en todos sus matices.",
      precio: 27.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-azul-grisaceo-de-corte-oversize.png",
        "/images/prendas/camisetas/camiseta-azul-grisacion-menor-de-corte-oversize.png",
        "/images/prendas/camisetas/camiseta-azul-clara-sobre-fondo-blanco (1).png",
        "/images/prendas/camisetas/camiseta-azul-apagado-de-corte-apretado.png"
      ],
      colores: [
        { nombre: "Azul Grisáceo", hex: "#8caab8", imagenUrl: "/images/prendas/camisetas/camiseta-azul-grisaceo-de-corte-oversize.png" },
        { nombre: "Azul Grisación", hex: "#aab8b7", imagenUrl: "/images/prendas/camisetas/camiseta-azul-grisacion-menor-de-corte-oversize.png" },
        { nombre: "Azul Claro", hex: "#c0e7ff", imagenUrl: "/images/prendas/camisetas/camiseta-azul-clara-sobre-fondo-blanco (1).png" },
        { nombre: "Azul Apagado", hex: "#c5cfd6", imagenUrl: "/images/prendas/camisetas/camiseta-azul-apagado-de-corte-apretado.png" }
      ]
    },
     {
      nombre: "Camiseta Multicolor Tie Dye",
      descripcion: "La camiseta más festivalera y diferente.",
      precio: 35.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-multicolor-tie-dye-pasteles-oversize.png"
      ],
      colores: [
        { nombre: "Multicolor", hex: "#ffeaa7/#aee9d1/#f9bec7/#bbd7ed", imagenUrl: "/images/prendas/camisetas/camiseta-multicolor-tie-dye-pasteles-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Gradiente y Coral",
      descripcion: "Para cabras con flow: gradiente y coral.",
      precio: 33.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-de-gradiente-morado-y-turquesa-oversize.png",
        
      ],
      colores: [
        { nombre: "Gradiente Morado/Turquesa", hex: "#a084ee/#5eead4", imagenUrl: "/images/prendas/camisetas/camiseta-de-gradiente-morado-y-turquesa-oversize.png" },

      ]
    },
    {
      nombre: "Camiseta Negra",
      descripcion: "Oscuridad y actitud para auténticas cabras rebeldes.",
      precio: 29.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-negra-oversized-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Negro", hex: "#181818", imagenUrl: "/images/prendas/camisetas/camiseta-negra-oversized-sobre-fondo-blanco.png" }
      ]
    },
    {
      nombre: "Camiseta Gris Family",
      descripcion: "Para minimalistas con cuernos. Toda la gama gris.",
      precio: 28.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-gris-heather-oversize.png",
        "/images/prendas/camisetas/camiseta-gris-heather-apretada.png",
        "/images/prendas/camisetas/camiseta-gris-carbón-de-oversize.png",
        "/images/prendas/camisetas/camiseta-gris-apretada.png"
      ],
      colores: [
        { nombre: "Gris Heather Oversize", hex: "#bbbbbb", imagenUrl: "/images/prendas/camisetas/camiseta-gris-heather-oversize.png" },
        { nombre: "Gris Heather Apretada", hex: "#cccccc", imagenUrl: "/images/prendas/camisetas/camiseta-gris-heather-apretada.png" },
        { nombre: "Gris Carbón", hex: "#484848", imagenUrl: "/images/prendas/camisetas/camiseta-gris-carbón-de-oversize.png" },
        { nombre: "Gris", hex: "#555", imagenUrl: "/images/prendas/camisetas/camiseta-gris-apretada.png" }
      ]
    },
    {
      nombre: "Camiseta Blanca y Perla",
      descripcion: "Pureza rebelde para cabras con luz propia.",
      precio: 27.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-blanca-oversize.png",
        "/images/prendas/camisetas/camiseta-perlada-oversize.png",
        "/images/prendas/camisetas/camiseta-perla-apretada.png"
      ],
      colores: [
        { nombre: "Blanco", hex: "#fff", imagenUrl: "/images/prendas/camisetas/camiseta-blanca-oversize.png" },
        { nombre: "Perlada", hex: "#f6f6ef", imagenUrl: "/images/prendas/camisetas/camiseta-perlada-oversize.png" },
        { nombre: "Perla", hex: "#e4e2de", imagenUrl: "/images/prendas/camisetas/camiseta-perla-apretada.png" }
      ]
    },
    {
      nombre: "Camiseta Multicolor 4 Cuernos",
      descripcion: "Más personalidad que colores. 4 tonos, 0 límites.",
      precio: 34.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png",
        "/images/prendas/camisetas/camiseta-4colores-blanco-morado-azul-y-amarillo-oversize.png",
        "/images/prendas/camisetas/camiseta-4colores-verde-naranja-amarillo-y-azul-oversize.png"
      ],
      colores: [
        { nombre: "Amarillo/Azul/Verde/Naranja Coral", hex: "#ffe23d/#58c3fa/#a7ff83/#ffb085", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-amarillo-azul-verde-y-naranja-coral-oversize.png" },
        { nombre: "Blanco/Morado/Azul/Amarillo", hex: "#fff/#b384ff/#38a1db/#ffe23d", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-blanco-morado-azul-y-amarillo-oversize.png" },
        { nombre: "Verde/Naranja/Amarillo/Azul", hex: "#a7ff83/#ffb085/#ffe23d/#58c3fa", imagenUrl: "/images/prendas/camisetas/camiseta-4colores-verde-naranja-amarillo-y-azul-oversize.png" }
      ]
    },
    {
      nombre: "Camiseta Bicolor Family",
      descripcion: "Para cabras que quieren TODO: bicolor siempre.",
      precio: 32.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-bicolor-amarillo-y-verde-marino-oversize.png",
        "/images/prendas/camisetas/camiseta-bicolor-azul-y-blanca-oversize.png",
        "/images/prendas/camisetas/camiseta-bicolor-verde-oscuro-y-roja-palooversize.png",
        "/images/prendas/camisetas/camiseta-de-manga-corta-bicolor-negra-y-gris-oversize.png"
      ],
      colores: [
        { nombre: "Amarillo/Verde Marino", hex: "#ffe23d/#27623b", imagenUrl: "/images/prendas/camisetas/camiseta-bicolor-amarillo-y-verde-marino-oversize.png" },
        { nombre: "Azul/Blanco", hex: "#38a1db/#fff", imagenUrl: "/images/prendas/camisetas/camiseta-bicolor-azul-y-blanca-oversize.png" },
        { nombre: "Verde Oscuro/Rojo Palo", hex: "#1b4332/#c1121f", imagenUrl: "/images/prendas/camisetas/camiseta-bicolor-verde-oscuro-y-roja-palooversize.png" },
        { nombre: "Negra/Gris", hex: "#181818/#aaaaaa", imagenUrl: "/images/prendas/camisetas/camiseta-de-manga-corta-bicolor-negra-y-gris-oversize.png" }
      ]
    },
    

    {
      nombre: "Camiseta Azul Intenso",
      descripcion: "Vibrante, eléctrica, siempre azul.",
      precio: 27.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-azul-apretada.png",
        "/images/prendas/camisetas/camiseta-azul-pizarra-apretada.png",
        "/images/prendas/camisetas/camiseta-azul-royal-apretada.png",
        "/images/prendas/camisetas/camiseta-azul-sobre-apretada.png"
      ],
      colores: [
        { nombre: "Azul", hex: "#4573a0", imagenUrl: "/images/prendas/camisetas/camiseta-azul-apretada.png" },
        { nombre: "Azul Pizarra", hex: "#5e6e8c", imagenUrl: "/images/prendas/camisetas/camiseta-azul-pizarra-apretada.png" },
        { nombre: "Azul Royal", hex: "#3a6db7", imagenUrl: "/images/prendas/camisetas/camiseta-azul-royal-apretada.png" },
        { nombre: "Azul Sobre", hex: "#3c78b2", imagenUrl: "/images/prendas/camisetas/camiseta-azul-sobre-apretada.png" }
      ]
    },
    {
      nombre: "Camiseta Pastel y Menta",
      descripcion: "Dulces por fuera, cabras por dentro.",
      precio: 29.95,
      tipo: "CAMISETA",
      imagenes: [
        "/images/prendas/camisetas/camiseta-amarilla-pastel-de-corte-apretado.png",
        "/images/prendas/camisetas/camiseta-rosa-pastel-apretada.png",
        "/images/prendas/camisetas/camiseta-verde-menta-apretada.png",
      ],
      colores: [
        { nombre: "Amarillo Pastel", hex: "#ffeaa7", imagenUrl: "/images/prendas/camisetas/camiseta-amarilla-pastel-de-corte-apretado.png" },
        { nombre: "Rosa Pastel", hex: "#f9bec7", imagenUrl: "/images/prendas/camisetas/camiseta-rosa-pastel-apretada.png" },
        { nombre: "Verde Menta", hex: "#aee9d1", imagenUrl: "/images/prendas/camisetas/camiseta-verde-menta-apretada.png" },
      ]
    }
    
  ];

  // ===================== SUDADERAS ===================== //
  const sudaderas = [
    {
      nombre: "Sudadera Negra y Gris",
      descripcion: "Para rebeldes discretos y con actitud.",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-negra-minimalista-con-cuello-redondo.png",
        "/images/prendas/sudaderas/sudadera-gris-heather-con-cuello-redondo.png",
        "/images/prendas/sudaderas/sudadera-gris-clara-de-corte-oversize.png",

      ],
      colores: [
        { nombre: "Negro", hex: "#181818", imagenUrl: "/images/prendas/sudaderas/sudadera-negra-minimalista-con-cuello-redondo.png" },
        { nombre: "Gris Heather", hex: "#cccccc", imagenUrl: "/images/prendas/sudaderas/sudadera-gris-heather-con-cuello-redondo.png" },
        { nombre: "Gris Claro", hex: "#ececec", imagenUrl: "/images/prendas/sudaderas/sudadera-gris-clara-de-corte-oversize.png" },

      ]
    },
        {
      nombre: "Sudadera Beige y Taupe",
      descripcion: "Tonos tierra para cabras que pisan fuerte.",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-marrón-de-corte-holgado.png",
        "/images/prendas/sudaderas/sudadera-beige-de-cuello-redondo.png",
        "/images/prendas/sudaderas/sudadera-beige-sobre-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-de-corte-oversize-taupe.png"
        
        
      ],
      colores: [
        { nombre: "Marrón", hex: "#6f4e37", imagenUrl: "/images/prendas/sudaderas/sudadera-marrón-de-corte-holgado.png" },
        { nombre: "Beige", hex: "#f5eedc", imagenUrl: "/images/prendas/sudaderas/sudadera-beige-de-cuello-redondo.png" },
        { nombre: "Beige Fondo Blanco", hex: "#e9e4de", imagenUrl: "/images/prendas/sudaderas/sudadera-beige-sobre-fondo-blanco.png" },
        { nombre: "Taupe", hex: "#baa38a", imagenUrl: "/images/prendas/sudaderas/sudadera-de-corte-oversize-taupe.png" },
        
      ]
    },
    {
      nombre: "Sudadera Azul Family",
      descripcion: "Toda la gama de azules y marinos.",
      precio: 42.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-azul-navy-oversize.png",
        "/images/prendas/sudaderas/sudadera-azul-marino-oversize.png",
        "/images/prendas/sudaderas/sudadera-azul-en-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-azul-sobre-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-azul-relajada-sobre-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-azul-suave-con-detalles-finos.png"
      ],
      colores: [
        { nombre: "Azul Navy", hex: "#001f54", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-navy-oversize.png" },
        { nombre: "Azul Marino", hex: "#203562", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-marino-oversize.png" },
        { nombre: "Azul Claro", hex: "#b4e1fa", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-en-fondo-blanco.png" },
        { nombre: "Azul Sobre", hex: "#6da9d2", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-sobre-fondo-blanco.png" },
        { nombre: "Azul Relajada", hex: "#98bad6", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-relajada-sobre-fondo-blanco.png" },
        { nombre: "Azul Suave", hex: "#cad2e2", imagenUrl: "/images/prendas/sudaderas/sudadera-azul-suave-con-detalles-finos.png" }
      ]
    },
    {
      nombre: "Sudadera Verde Family",
      descripcion: "Frescura en cada salto.",
      precio: 40.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-verde-menta-de-corte-amplio.png",
        "/images/prendas/sudaderas/sudadera-verde-pastel-en-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-verde-salvia-estilo-oversize.png",
        "/images/prendas/sudaderas/sudadera-verde-salvia-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Verde Menta", hex: "#aee9d1", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-menta-de-corte-amplio.png" },
        { nombre: "Verde Pastel", hex: "#b7efc5", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-pastel-en-fondo-blanco.png" },
        { nombre: "Verde Salvia Oversize", hex: "#b2d3a6", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-salvia-estilo-oversize.png" },
        { nombre: "Verde Salvia", hex: "#96d38c", imagenUrl: "/images/prendas/sudaderas/sudadera-verde-salvia-sobre-fondo-blanco.png" }
      ]
    },

    {
      nombre: "Sudadera Blanca Family",
      descripcion: "Minimalismo en blanco puro.",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-blanca-de-corte-oversize (1).png",
        "/images/prendas/sudaderas/sudadera-blanco-sobre-fondo-gris.png"
      ],
      colores: [
        { nombre: "Blanco Oversize", hex: "#fff", imagenUrl: "/images/prendas/sudaderas/sudadera-blanca-de-corte-oversize (1).png" },
        { nombre: "Blanco Fondo Gris", hex: "#f8f8f8", imagenUrl: "/images/prendas/sudaderas/sudadera-blanco-sobre-fondo-gris.png" }
      ]
    },
    {
      nombre: "Sudadera Coral y Burdeos",
      descripcion: "Para las cabras más sofisticadas.",
      precio: 44.5,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-coral-sobre-fondo-blanco.png",
        "/images/prendas/sudaderas/sudadera-burdeos-de-corte-oversize.png",
        "/images/prendas/sudaderas/sudadera-burgundy-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Coral", hex: "#ffb085", imagenUrl: "/images/prendas/sudaderas/sudadera-coral-sobre-fondo-blanco.png" },
        { nombre: "Burdeos", hex: "#801336", imagenUrl: "/images/prendas/sudaderas/sudadera-burdeos-de-corte-oversize.png" },
        { nombre: "Burgundy", hex: "#900020", imagenUrl: "/images/prendas/sudaderas/sudadera-burgundy-sobre-fondo-blanco.png" }
      ]
    },
    {
      nombre: "Sudadera Amarilla y Marrón",
      descripcion: "Cabras alegres y tierra.",
      precio: 39.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-amarilla-pastel-sobre-fondo-blanco.png"

      ],
      colores: [
        { nombre: "Amarillo Pastel", hex: "#ffeaa7", imagenUrl: "/images/prendas/sudaderas/sudadera-amarilla-pastel-sobre-fondo-blanco.png" }
        
      ]
    },
    {
      nombre: "Sudadera Roja Family",
      descripcion: "Para cabras cañeras.",
      precio: 42.95,
      tipo: "SUDADERA",
      imagenes: [
        "/images/prendas/sudaderas/sudadera-roja-con-cuello-redondo.png",
        "/images/prendas/sudaderas/sudadera-roja-sobre-fondo-blanco.png"
      ],
      colores: [
        { nombre: "Roja", hex: "#c1121f", imagenUrl: "/images/prendas/sudaderas/sudadera-roja-con-cuello-redondo.png" },
        { nombre: "Roja Fondo Blanco", hex: "#d34040", imagenUrl: "/images/prendas/sudaderas/sudadera-roja-sobre-fondo-blanco.png" }
      ]
    }
  ];

  // ====== CREA PARA ADULTOS Y NIÑOS
  for (const prod of camisetas) {
    await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion + " (Adulto Rebelde)",
        precio: prod.precio,
        tipo: prod.tipo,
        categoriaId: rebeldes.id,
        imagenes: { create: prod.imagenes.map(url => ({ url })) },
        colores: { create: prod.colores }
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
        colores: { create: prod.colores }
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
        colores: { create: prod.colores }
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
        colores: { create: prod.colores }
      }
    });
  }

  console.log("¡Seed actualizado con éxito y todas las imágenes reales usadas! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
