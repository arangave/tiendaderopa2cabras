// app/components/ProductoCard.tsx
"use client";

import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import type { Product } from "../data/products";

export interface ProductoCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onToggleLike: (product: Product) => void;
  isLiked: boolean;
}

export default function ProductoCard({
  product,
  onOpenModal,
  onToggleLike,
  isLiked,
}: ProductoCardProps) {
  return (
    <div
      className="product-card relative bg-white p-4 rounded-lg shadow-md overflow-hidden max-w-xs mx-auto text-center"
      style={{ "--highlight-opacity": 0 } as React.CSSProperties}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={250}
        height={300}
        className="cursor-pointer rounded-md mx-auto"
        onClick={() => onOpenModal(product)}
      />
      <h3 className="mt-2 text-lg font-semibold text-black">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => onOpenModal(product)}
          className="holo-btn"
        >
          Ver Producto
        </button>
      </div>

      <button
        onClick={() => onToggleLike(product)}
        className="absolute bottom-4 right-4 p-1 hover:scale-110 transition-colors duration-300 ease-in-out"
        aria-label="Me gusta"
      >
        {isLiked ? (
          <HeartIconSolid
            className="w-6 h-6 transition-colors duration-300 ease-in-out"
            style={{ fill: "url(#grad)", transition: "fill 0.3s ease" }}
          />
        ) : (
          <HeartIcon
            className="w-6 h-6 text-black stroke-[0.5] transition-colors duration-300 ease-in-out"
            strokeWidth={1}
            fill="none"
          />
        )}
      </button>

      <style jsx>{`
        .product-card {
          position: relative;
        }
        .product-card::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            #67b2c1 0%,
            #ff8eaa 50%,
            #f6bd6b 100%
          );
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: destination-out;
          opacity: var(--highlight-opacity);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .product-card:hover::before {
          opacity: 1;
        }

        .holo-btn {
          position: relative;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          color: #374151;
          background: #ffffff;
          border: 2px solid #d1d5db;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: border-image-source 0.5s ease, box-shadow 0.3s ease;
          border-image-slice: 1;
          border-image-source: none;
        }
        .holo-btn:hover {
          border-image-source: linear-gradient(
            90deg,
            #67b2c1 0%,
            #ff8eaa 50%,
            #f6bd6b 100%
          );
          box-shadow: 0 4px 10px rgba(103, 178, 193, 0.4), 0 4px 10px rgba(255, 142, 170, 0.4);
        }
        .holo-btn > * { position: relative; z-index: 1; }
      `}</style>
    </div>
  );
}
