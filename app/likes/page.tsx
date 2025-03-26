"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";
import Header from "../components/Header";



import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const storedCart = localStorage.getItem("cart");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const removeFromFavorites = (id: number) => {
    const updated = favorites.filter((p) => p.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    showToast("Producto eliminado de favoritos ❌");
  };

  const addToCart = (product: Product) => {
    if (!product.size) {
      alert("Selecciona una talla antes de añadir a la cesta.");
      return;
    }

    const alreadyInCart = cart.some(
      (p) => p.id === product.id && p.size === product.size
    );

    if (alreadyInCart) {
      showToast("Este producto ya está en la cesta");
      return;
    }

    const updated = [...cart, { ...product, quantity: 1 }];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    showToast("Producto añadido a la cesta 🛒");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <main className="px-4 pt-30 pb-8 max-w-6xl mx-auto">
        <Header cartCount={cart.length} favoritesCount={favorites.length} />
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toastMessage}
        </div>
      )}

      <h2 className="text-center text-3xl font-bold mb-6">Mis Favoritos</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-lg mt-20 text-gray-700">
          Aún no has añadido productos a favoritos ❤️
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-md object-cover"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.price}</p>

              {/* Selector de tallas */}
              <div className="my-3">
                <label className="block text-sm font-medium mb-1">Talla:</label>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={`${product.id}-${size}`}
                      className={`px-2 py-1 border rounded-md text-sm ${
                        product.size === size
                          ? "bg-black text-white"
                          : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                      }`}
                      onClick={() => {
                        const updated = favorites.map((p) =>
                          p.id === product.id ? { ...p, size } : p
                        );
                        setFavorites(updated);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  className="w-full bg-black text-white px-3 py-2 rounded hover:bg-green-800"
                  onClick={() => addToCart(product)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBagIcon className="w-5 h-5" /> Añadir
                  </span>
                </button>
                <button
                  className="bg-white border border-black text-black px-3 py-2 rounded hover:bg-red-700 hover:text-white"
                  onClick={() => removeFromFavorites(product.id)}
                >
                  <HeartIconSolid className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
