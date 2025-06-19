"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";
import IAFlotante from "../components/IAFlotante";
import NewsletterForm from "../components/NewsletterForm";
import { useSearchParams } from "next/navigation";
import { ShoppingBagIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";

import Modal from "../components/Modal";
import SizeGuideModal from "../components/SizeGuideModal";
import ProductoCard from "../components/ProductoCard";
import type { Product } from "../data/products";
import Header from "../components/Header";
import ThemeToggleButton from "../components/ThemeToggleButton"; // donde lo tengas

type ProductoAPI = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  tipo: string;
  imagenes: { url: string }[];
  colores: { nombre: string; hex: string; imagenUrl?: string }[];
  categoria: { nombre: string };
};
function mapProductoAPIToProduct(producto: ProductoAPI): Product {
  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.descripcion,
    price: producto.precio.toFixed(2) + "€",
    image: producto.imagenes[0]?.url || "/images/default.png",
    quantity: 1,
    colors: producto.colores.map((c) => ({
      name: c.nombre,
      hex: c.hex,
      image: c.imagenUrl || producto.imagenes[0]?.url || "/images/default.png",
    })),
  };
}

export default function Inicio() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [zoom, setZoom] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState<number>(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sweaterIndex, setSweaterIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [likes, setLikes] = useState<Product[]>([]);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [unsubMsg, setUnsubMsg] = useState<string | null>(null);
  const [tshirtIndex, setTshirtIndex] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProductos() {
      const res = await fetch("/api/categories-with-products");
      const data = await res.json();
      const allProducts: Product[] = data.flatMap((cat: any) =>
        cat.productos.map(mapProductoAPIToProduct)
      );
      setProductos(allProducts);
    }
    fetchProductos();
  }, []);

  const destacados = productos.slice(0, 4);
  const sweaters = productos.filter((p) => p.name?.toLowerCase().includes("sudadera"));
  const tshirts = productos.filter((p) => p.name?.toLowerCase().includes("camiseta"));

  useEffect(() => {
    const unsubscribed = searchParams?.get("unsubscribed");
    if (unsubscribed === "1") setUnsubMsg("Te has dado de baja correctamente de la newsletter.");
    else if (unsubscribed === "0") setUnsubMsg("No encontramos tu suscripción a la newsletter.");
    else setUnsubMsg(null);
  }, [searchParams]);
  useEffect(() => {
    if (unsubMsg) {
      const timer = setTimeout(() => setUnsubMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [unsubMsg]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const itemsPerPage = windowWidth < 768 ? 1 : 3;
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const isProductLiked = (id: number) => likes.some((p) => p.id === id);
  const toggleLike = (product: Product) => {
    setLikes((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      else return [...prev, product];
    });
  };
  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => {
    setSelectedProduct(null);
    setZoom(false);
  };
  const addToCart = (params: {
    frase: string;
    tipoFrase: string;
    color: string;
    colorHex: string;
    colorImage: string;
    image: string;
    size: string;
    quantity: number;
  }) => {
    if (!params.size) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    const productoFinal = {
      ...selectedProduct!,
      quantity: params.quantity,
      size: params.size,
      phrase: params.frase || "Sin frase",
      tipoFrase: params.tipoFrase,
      color: params.color,
      colorHex: params.colorHex,
      colorImage: params.colorImage,
      image: params.image,
    };

    const updatedCart = [...cart, productoFinal];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showToast("Producto añadido a la cesta 🛒");
    setSelectedProduct(null);
  };
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("norma-hover")) {
        target.classList.toggle("active");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(newQuantity);
  };
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
      {unsubMsg && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-[#ff8eaa] text-white px-4 py-2 rounded-md shadow-lg z-[9999] transition-all duration-300">
          {unsubMsg}
        </div>
      )}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-[9999] transition-all duration-300">
          {toastMessage}
        </div>
      )}
      <main>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67b2c1" />
              <stop offset="50%" stopColor="#ff8eaa" />
              <stop offset="100%" stopColor="#f6bd6b" />
            </linearGradient>
          </defs>
        </svg>

        <Header cartCount={cart.length} favoritesCount={likes.length} />


        <section className="hero pt-4 sm:pt-17 pb-4 sm:pb-8">
          {/* BOTON DE NOCHE Y DIA */}
          <div className="absolute top-28 sm:top-36 right-4 z-50">
            <ThemeToggleButton />
          </div>
          <div className="hero-content px-2 sm:px-8 max-w-7xl mx-auto mt-[-50px] sm:mt-0">
            <div className="hero-text text-center sm:text-left">
              <h2 className="text-xs sm:text-sm font-bold mb-1 sm:mb-3">Descubre el estilo de 2CabrasConTraje</h2>
              <p className="text-[8px] sm:text-[10px] mb-1 sm:mb-2">Moda exclusiva para quienes buscan algo único.</p>
              <p className="highlight text-[8px] sm:text-[10px] mb-3">
                &quot;Rompe con la <span className="norma-hover">norma</span> o ponle los cuernos&quot;
              </p>
              <a
                href="/productos"
                className="btn px-3 py-1 sm:px-5 sm:py-2 text-[8px] sm:text-[10px] shadow-md shadow-black/40 hover:shadow-lg hover:shadow-black/20 transition duration-300"
              >
                Ver Colección
              </a>
            </div>
            <div className="hero-video mt-2 sm:mt-4">
              <video autoPlay muted loop playsInline className="w-full h-auto rounded-lg shadow-md">
                <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
                Tu navegador no soporta video HTML5
              </video>
            </div>
          </div>
        </section>

        <section className="products mt-0">
          <div className="flex flex-col items-center justify-center my-6">
            <h2 className="text-center text-3xl font-bold text-black mb-2">Destacados</h2>
            <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            {destacados.length > itemsPerPage && (
              <button
                onClick={() =>
                  setFeaturedIndex((prev) =>
                    prev === 0 ? destacados.length - itemsPerPage : prev - 1
                  )
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10  hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ‹
              </button>
            )}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: `${(destacados.length * 100) / itemsPerPage}%`,
                  transform: `translateX(-${featuredIndex * (100 / destacados.length)}%)`,
                }}
              >
                {destacados.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-center px-3 flex-shrink-0 mb-6"
                    style={{ width: `${100 / destacados.length}%` }}
                  >
                    <ProductoCard
                      product={product}
                      onOpenModal={openModal}
                      onToggleLike={toggleLike}
                      isLiked={isProductLiked(product.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {destacados.length > itemsPerPage && (
              <button
                onClick={() =>
                  setFeaturedIndex((prev) =>
                    prev >= destacados.length - itemsPerPage ? 0 : prev + 1
                  )
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10  hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
        </section>

        <section className="products mt-0">
          <div className="flex flex-col items-center justify-center my-6">
            <h2 className="text-center text-3xl font-bold text-black mb-2">Sudaderas</h2>
            <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            {sweaters.length > itemsPerPage && (
              <button
                onClick={() =>
                  setSweaterIndex((prev) =>
                    prev === 0 ? sweaters.length - itemsPerPage : prev - 1
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10  hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ‹
              </button>
            )}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: `${(sweaters.length * 100) / itemsPerPage}%`,
                  transform: `translateX(-${sweaterIndex * (100 / sweaters.length)}%)`,
                }}
              >
                {sweaters.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-center px-3 flex-shrink-0 mb-6"
                    style={{ width: `${100 / sweaters.length}%` }}
                  >
                    <ProductoCard
                      product={{ ...item, description: "Sudadera exclusiva", quantity: 1 }}
                      onOpenModal={openModal}
                      onToggleLike={toggleLike}
                      isLiked={isProductLiked(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {sweaters.length > itemsPerPage && (
              <button
                onClick={() =>
                  setSweaterIndex((prev) =>
                    prev >= sweaters.length - itemsPerPage ? 0 : prev + 1
                  )
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10  hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
        </section>


        <section className="products mt-0">
          <div className="flex flex-col items-center justify-center my-6">
            <h2 className="text-center text-3xl font-bold text-black mb-2">Camisetas</h2>
            <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            {tshirts.length > itemsPerPage && (
              <button
                onClick={() =>
                  setTshirtIndex((prev) =>
                    prev === 0 ? tshirts.length - itemsPerPage : prev - 1
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10  hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ‹
              </button>
            )}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: `${(tshirts.length * 100) / itemsPerPage}%`,
                  transform: `translateX(-${tshirtIndex * (100 / tshirts.length)}%)`,
                }}
              >
                {tshirts.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-center px-3 flex-shrink-0 mb-6"
                    style={{ width: `${100 / tshirts.length}%` }}
                  >
                    <ProductoCard
                      product={{ ...item, description: "Camiseta exclusiva", quantity: 1 }}
                      onOpenModal={openModal}
                      onToggleLike={toggleLike}
                      isLiked={isProductLiked(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {tshirts.length > itemsPerPage && (
              <button
                onClick={() =>
                  setTshirtIndex((prev) =>
                    prev >= tshirts.length - itemsPerPage ? 0 : prev + 1
                  )
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-white hover:text-black border to-black cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
        </section>

        <section className="bg-white py-12 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Únete al mundo de <span className="bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] bg-clip-text text-transparent">2CabrasConTraje</span>
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-6">
            Recibe ideas, filosofía de marca y alguna que otra forma de<br /> &quot;poner los cuernos&quot;... al sistema. ✨
          </p>
          <NewsletterForm />
        </section>

          {selectedProduct && (
            <Modal
              product={selectedProduct}
              selectedSize={selectedSize}
              quantity={quantity}
              zoom={zoom}
              zoomPosition={zoomPosition}
              isLiked={isProductLiked(selectedProduct.id)}
              onClose={closeModal}
              onAddToCart={addToCart}
              onSelectSize={setSelectedSize}
              onZoomMove={handleMouseMove}
              onToggleLike={() => toggleLike(selectedProduct)}
              onShowSizeGuide={() => setShowSizeGuideModal(true)}
              onQuantityChange={handleQuantityChange}
            />
          )}


        {showSizeGuideModal && (
          <SizeGuideModal onClose={() => setShowSizeGuideModal(false)} />
        )}

        <IAFlotante />
      </main>
    </>
  );
}
