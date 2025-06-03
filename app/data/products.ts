// data/products.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;

  // Propiedades nuevas:
  color?: string;      // color “seleccionado” por el usuario
  phrase?: string;     // frase de personalización, si hubiera

  colors?: {
    name: string;
    hex: string;
    image: string;
  }[];
}

//  Camisetas Cabras Rebeldes
export const rebelTshirts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Camiseta Rebelde ${i + 1}`,
  description: "Camiseta exclusiva de la colección Cabras Rebeldes",
  price: `${(29.99 + i).toFixed(2).replace(".", ",")}€`,
  quantity: 1,
  colors: [
    {
      name: "Negro",
      hex: "#000000",
      image: "/images/Backside T-Shirt Mockup.png",
    },
    {
      name: "Blanco",
      hex: "#ffffff",
      image: "/images/camiseta doblada por delante logo negro con letras- fondo blanco.png",
    },
  ],
  image: "/images/Backside T-Shirt Mockup.png",
}));

//  Sudaderas Cabras Rebeldes
export const rebelSweaters: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 11,
  name: `Sudadera Rebelde ${i + 1}`,
  description: "Sudadera cálida de estilo rebelde",
  price: `${(39.99 + i).toFixed(2).replace(".", ",")}€`,
  quantity: 1,
  colors: [
    {
      name: "Negro",
      hex: "#000000",
      image: "/images/Backside T-Shirt Mockup.png",
    },
    {
      name: "Blanco",
      hex: "#ffffff",
      image: "/images/camiseta doblada por delante logo negro con letras- fondo blanco.png",
    },
  ],
  image: "/images/Backside T-Shirt Mockup.png",
}));

//  Camisetas Cabras Traviesas
export const naughtyTshirts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 21,
  name: `Camiseta Traviesa ${i + 1}`,
  description: "Camiseta divertida para peques con actitud",
  price: `${(19.99 + i).toFixed(2).replace(".", ",")}€`,
  quantity: 1,
  colors: [
    {
      name: "Negro",
      hex: "#000000",
      image: "/images/Backside T-Shirt Mockup.png",
    },
    {
      name: "Blanco",
      hex: "#ffffff",
      image: "/images/camiseta doblada por delante logo negro con letras- fondo blanco.png",
    },
  ],
  image: "/images/Backside T-Shirt Mockup.png",
}));

//  Sudaderas Cabras Traviesas
export const naughtySweaters: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 31,
  name: `Sudadera Traviesa ${i + 1}`,
  description: "Sudadera cómoda y alegre",
  price: `${(24.99 + i).toFixed(2).replace(".", ",")}€`,
  quantity: 1,
  colors: [
    {
      name: "Negro",
      hex: "#000000",
      image: "/images/Backside T-Shirt Mockup.png",
    },
    {
      name: "Blanco",
      hex: "#ffffff",
      image: "/images/camiseta doblada por delante logo negro con letras- fondo blanco.png",
    },
  ],
  image: "/images/Backside T-Shirt Mockup.png",
}));

//  Productos destacados (mezcla manual)
export const destacados: Product[] = [
  rebelTshirts[0],
  rebelSweaters[1],
  naughtyTshirts[2],
  naughtySweaters[3],
];
