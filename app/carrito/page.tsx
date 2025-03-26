"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";
import Header from "../components/Header";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

export default function Carrito() {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: number]: string }>({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  const updateCartAndStorage = (updatedCart: Product[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const removeFromCart = (id: number, size?: string) => {
    const updatedCart = cart.filter(
      (product) => !(product.id === id && product.size === size)
    );
    updateCartAndStorage(updatedCart);
    showToast("Producto eliminado ❌");
  };

  const updateQuantity = (id: number, quantity: number, size?: string) => {
    const updatedCart = cart.map((product) =>
      product.id === id && product.size === size
        ? { ...product, quantity }
        : product
    );
    updateCartAndStorage(updatedCart);
  };

  const removeFromFavorites = (productId: number) => {
    const updated = favorites.filter((p) => p.id !== productId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    updateCartAndStorage(updatedCart);
    showToast("Producto añadido desde favoritos 🛒");
  };

  const totalPrice = cart
    .reduce((acc, product) => {
      const price = parseFloat(product.price.replace("€", "").replace(",", "."));
      return acc + price * product.quantity;
    }, 0)
    .toFixed(2);

  const favoritesNotInCart = favorites.filter(
    (fav) => !cart.some((item) => item.id === fav.id && item.size === fav.size)
  );

  return (
    <main>
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toastMessage}
        </div>
      )}

      <Header cartCount={cart.length} favoritesCount={favorites.length} />

      <section className="carrito px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">Carrito de Compras</h2>

        {cart.length === 0 ? (
          <p className="text-center text-lg mt-20 text-gray-700">Tu carrito está vacío.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.size}-${index}`}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price} — Talla: {item.size ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Math.max(1, parseInt(e.target.value)), item.size)
                    }
                    className="w-16 border rounded px-2 text-center"
                  />
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Eliminar
                  </button>

                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">Total: {totalPrice}€</p>
              <button
                className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700"
                onClick={() => alert("Ir a realizar el pedido")}
              >
                Tramitar Pedido
              </button>
            </div>
          </>
        )}
      </section>

      {/* Productos favoritos sugeridos */}

      {favoritesNotInCart.length > 0 && (
  <section className="sugerencias px-4 py-8 max-w-6xl mx-auto">
    <h3 className="text-xl font-semibold mb-6 text-center">
      ¿Quieres añadir alguno de los productos que te han gustado a la cesta?
    </h3>

    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-6 px-2 sm:px-4 scroll-snap-x scroll-smooth">
        {favoritesNotInCart.map((fav) => (
          <div
          key={`${fav.id}`}
          className="min-w-[260px] max-w-[300px] snap-start bg-white border rounded-lg shadow-md p-4 flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
        >
        
            <Image
              src={fav.image}
              alt={fav.name}
              width={240}
              height={240}
              className="rounded-md object-cover mb-3"
            />
            <p className="font-semibold text-lg">{fav.name}</p>
            <p className="text-sm text-gray-500 mb-2">{fav.price}</p>

            {/* Tallas dinámicas */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Selecciona una talla:</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={`${fav.id}-${size}`}
                    className={`px-2 py-1 border rounded-md text-sm ${
                      selectedSizes[fav.id] === size
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                    }`}
                    onClick={() =>
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [fav.id]: size,
                      }))
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2 mt-3">
            <button
                onClick={() => {
                  const selectedSize = selectedSizes[fav.id];
                  if (!selectedSize) {
                    alert("Selecciona una talla antes de añadir a la cesta.");
                    return;
                  }
                  addToCart({ ...fav, quantity: 1, size: selectedSize });
                }}
                className="w-full bg-black text-white px-3 py-1 rounded hover:bg-green-800"
              >
                Añadir a la cesta
              </button>


              <button
                onClick={() => removeFromFavorites(fav.id)}
                className="bg-white border border-black text-black px-3 py-1 rounded hover:bg-red-800 transition"
              >
                Quitar de favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}




      {/* Footer */}
      <footer className="text-center mt-10 mb-6 text-sm text-gray-500">
        <div className="social-links mb-2">
          <a href="#">Facebook</a> · <a href="#">Instagram</a> · <a href="#">Twitter</a>
        </div>
        <p>© 2025 2CabrasConTraje. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
