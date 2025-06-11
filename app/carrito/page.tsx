"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";
import Header from "../components/Header";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  phrase?: string;
  phraseType?: "random" | "personal" | "ia" | "ninguna";
}

export default function Carrito() {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: number]: string }>({});
  const [favoritesIndex, setFavoritesIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const price = parseFloat(
        product.price.replace("€", "").replace(",", ".")
      );
      return acc + price * product.quantity;
    }, 0)
    .toFixed(2);

  const favoritesNotInCart = favorites.filter(
    (fav) => !cart.some((item) => item.id === fav.id && item.size === fav.size)
  );

  // === NUEVO: texto del tipo de frase ===
  function getPhraseTypeText(type: string | undefined): string {
    if (!type || type === "ninguna") return "";
    if (type === "random") return "Frase random 🤪";
    if (type === "personal") return "Frase personalizada ✍️";
    if (type === "ia") return "Frase IA 🤖";
    return "";
  }

  return (
    <main className="pt-16 pb-8">
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toastMessage}
        </div>
      )}

      <Header cartCount={cart.length} favoritesCount={favorites.length} />

      <section className="mt-8 px-4 py-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="col-span-1 lg:col-span-8 bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 overflow-x-auto">

          <div className="hidden lg:block">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="pb-2"></th>
                  <th className="pb-2 text-left text-black">Foto</th>
                  <th className="pb-2 text-left text-black">Producto</th>
                  <th className="pb-2 text-right text-black">Precio</th>
                  <th className="pb-2 text-center text-black">Cantidad</th>
                  <th className="pb-2 text-right text-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => {
                  const price = parseFloat(item.price.replace(",", "."));
                  const lineTotal = (price * item.quantity).toFixed(2);
                  return (
                    <tr key={i} className="border-t">
                      <td className="py-4">
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="py-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover w-28 h-28"
                        />
                      </td>
                      <td className="py-4 text-black">
                        <p className="font-semibold">{item.name}</p>
                        {item.size && (
                          <p className="text-sm text-gray-600">Talla: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-600">Color: {item.color}</p>
                        )}
                        {/* Frase + tipo */}
                        {item.phrase && (
                          <p className="text-sm text-gray-600">
                            Frase: {item.phrase}
                            {item.phraseType && item.phraseType !== "ninguna" && (
                              <span className="block text-xs text-gray-400">
                                {getPhraseTypeText(item.phraseType)}
                              </span>
                            )}
                          </p>
                        )}
                        {!item.phrase && item.phraseType === "ninguna" && (
                          <p className="text-sm text-gray-400 italic">Sin frase</p>
                        )}
                      </td>
                      <td className="py-4 text-right text-black">{item.price}</td>
                      <td className="py-4 text-center">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Math.max(1, parseInt(e.target.value)),
                              item.size
                            )
                          }
                          className="w-16 border rounded px-2 text-center text-black"
                        />
                      </td>
                      <td className="py-4 text-right text-black">{lineTotal}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="block lg:hidden space-y-6">
            {cart.map((item, i) => {
              const price = parseFloat(item.price.replace(",", "."));
              const lineTotal = (price * item.quantity).toFixed(2);
              return (
                <div key={i} className="flex flex-col bg-white rounded-xl shadow p-4 relative">
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded w-20 h-20 object-cover"
                    />
                    <div className="flex flex-col justify-between h-full flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-black">{item.price}</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Math.max(1, parseInt(e.target.value)),
                              item.size
                            )
                          }
                          className="w-16 border rounded px-2 text-center text-black"
                        />
                      </div>
                      <div className="text-right font-bold text-black">{lineTotal}€</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-black">{item.name}</p>
                    {item.size && (
                      <p className="text-sm text-gray-600">Talla: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-600">Color: {item.color}</p>
                    )}
                    {/* Frase + tipo */}
                    {item.phrase && (
                      <p className="text-sm text-gray-600">
                        Frase: {item.phrase}
                        {item.phraseType && item.phraseType !== "ninguna" && (
                          <span className="block text-xs text-gray-400">
                            {getPhraseTypeText(item.phraseType)}
                          </span>
                        )}
                      </p>
                    )}
                    {!item.phrase && item.phraseType === "ninguna" && (
                      <p className="text-sm text-gray-400 italic">Sin frase</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="col-span-1 lg:col-span-4 bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-black">Totales</h3>
          <div className="space-y-3 flex-grow">
            <div className="flex justify-between text-black">
              <span>Subtotal</span>
              <span className="font-bold">{totalPrice}€</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span>Se calculará al finalizar</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-black font-semibold">
              <span>Total</span>
              <span>{totalPrice}€</span>
            </div>
          </div>
            <Link href="/checkout">
              <button
                className="mt-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] hover:opacity-90 transition-opacity duration-300 w-full"
              >
                Finalizar Compra
              </button>
            </Link>
        </aside>
      </section>

      {favoritesNotInCart.length > 0 && (
        <section className="mt-12 sugerencias px-4 py-8 max-w-6xl mx-auto text-black">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">
            ¿Quieres añadir alguno de los productos que te han gustado a la cesta?
          </h3>

          <div className="relative overflow-hidden">
            {favoritesNotInCart.length > itemsPerSlide && (
              <button
                onClick={() => setFavoritesIndex((prev) => Math.max(0, prev - 1))}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
              >
                ‹
              </button>
            )}

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: `${favoritesNotInCart.length * (100 / itemsPerSlide)}%`,
                  transform: `translateX(-${(100 / favoritesNotInCart.length) * favoritesIndex}%)`,
                }}
              >
                {favoritesNotInCart.map((fav) => (
                  <div
                    key={fav.id}
                    className="flex justify-center px-2"
                    style={{
                      width: `${100 / favoritesNotInCart.length}%`,
                      flexShrink: 0,
                    }}
                  >
                    <div className="bg-white border rounded-lg shadow-md p-4 h-full flex flex-col">
                      <Image
                        src={fav.image}
                        alt={fav.name}
                        width={240}
                        height={240}
                        className="rounded-md object-cover mb-3 w-full h-auto"
                      />
                      <p className="font-semibold text-lg">{fav.name}</p>
                      <p className="text-sm text-gray-500 mb-1">{fav.price}</p>
                      {fav.size && <p className="text-sm text-gray-600">Talla: {fav.size}</p>}
                      {fav.color && <p className="text-sm text-gray-600">Color: {fav.color}</p>}
                      {fav.phrase && (
                        <p className="text-sm text-gray-600">
                          Frase: {fav.phrase}
                          {fav.phraseType && fav.phraseType !== "ninguna" && (
                            <span className="block text-xs text-gray-400">
                              {getPhraseTypeText(fav.phraseType)}
                            </span>
                          )}
                        </p>
                      )}
                      {!fav.phrase && fav.phraseType === "ninguna" && (
                        <p className="text-sm text-gray-400 italic">Sin frase</p>
                      )}

                      <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">Talla:</label>
                        <div className="flex flex-wrap gap-2">
                          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                            <button
                              key={`${fav.id}-${size}`}
                              className={`px-2 py-1 border rounded-md text-sm ${
                                selectedSizes[fav.id] === size ?
                                  'bg-black text-white' :
                                  'bg-white text-black border-gray-300 hover:bg-black hover:text-white'
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

                      <div className="flex flex-col gap-2 mt-auto">
                        <button
                          onClick={() => {
                            const sel = selectedSizes[fav.id];
                            if (!sel) {
                              alert('Selecciona una talla antes de añadir a la cesta.');
                              return;
                            }
                            addToCart({ ...fav, quantity: 1, size: sel });
                          }}
                          className="w-full bg-black text-white px-3 py-1 rounded hover:bg-green-800"
                        >
                          Añadir a la cesta
                        </button>
                        <button
                          onClick={() => removeFromFavorites(fav.id)}
                          className="w-full bg-white border border-black text-black px-3 py-1 rounded hover:bg-red-800 transition"
                        >
                          Quitar de favoritos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {favoritesNotInCart.length > itemsPerSlide && (
              <button
                onClick={() =>
                  setFavoritesIndex((prev) => Math.min(prev + 1, favoritesNotInCart.length - itemsPerSlide))
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
              >
                ›
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
