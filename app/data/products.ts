import { Product } from "../components/ProductoCard";

// ✅ Camisetas Cabras Rebeldes
export const rebelTshirts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Camiseta Rebelde ${i + 1}`,
  description: "Camiseta exclusiva de la colección Cabras Rebeldes",
  price: `${(29.99 + i).toFixed(2).replace(".", ",")}€`,
  image: "/images/Backside T-Shirt Mockup.png",
  quantity: 1,
}));

// ✅ Sudaderas Cabras Rebeldes
export const rebelSweaters: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 11,
  name: `Sudadera Rebelde ${i + 1}`,
  description: "Sudadera cálida de estilo rebelde",
  price: `${(39.99 + i).toFixed(2).replace(".", ",")}€`,
  image: "/images/Backside T-Shirt Mockup.png",
  quantity: 1,
}));

// ✅ Camisetas Cabras Traviesas
export const naughtyTshirts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 21,
  name: `Camiseta Traviesa ${i + 1}`,
  description: "Camiseta divertida para peques con actitud",
  price: `${(19.99 + i).toFixed(2).replace(".", ",")}€`,
  image: "/images/Backside T-Shirt Mockup.png",
  quantity: 1,
}));

// ✅ Sudaderas Cabras Traviesas
export const naughtySweaters: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 31,
  name: `Sudadera Traviesa ${i + 1}`,
  description: "Sudadera cómoda y alegre",
  price: `${(24.99 + i).toFixed(2).replace(".", ",")}€`,
  image: "/images/Backside T-Shirt Mockup.png",
  quantity: 1,
}));

// ✅ Productos destacados (mezcla manual)
export const destacados: Product[] = [
  rebelTshirts[0],
  rebelSweaters[1],
  naughtyTshirts[2],
  naughtySweaters[3],
];
