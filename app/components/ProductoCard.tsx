"use client";

import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  colors?: {
    name: string;
    hex: string;
    image: string;
  }[];
}



export interface ProductoCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onToggleLike: (product: Product) => void;
  isLiked: boolean;
}

export default function ProductoCard({ product, onOpenModal, onToggleLike, isLiked }: ProductoCardProps) {
  return (
    <div className="product-card group bg-white p-4 rounded-lg shadow-md relative max-w-xs w-full mx-auto text-center">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="cursor-pointer rounded-md mx-auto"
        onClick={() => onOpenModal(product)}
      />
      <h3 className="text-lg font-semibold mt-2 text-black">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>

      {/* Botón Ver Producto centrado */}
      <div className="flex justify-center items-center mt-4">
        <button
          className="btn shadow-md shadow-black/40 hover:shadow-lg transition duration-300"
          onClick={() => onOpenModal(product)}
        >
          Ver Producto
        </button>
      </div>

      {/* Corazón abajo a la derecha */}
      <button
        onClick={() => onToggleLike(product)}
        className="absolute bottom-4 right-4 p-1 hover:scale-110 transition"
        aria-label="Me gusta"
      >
        {isLiked ? (
          <HeartIconSolid className="w-6 h-6" style={{ fill: "url(#grad)" }} />
        ) : (
          <HeartIcon className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
}
