"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../components/Modal";
import SizeGuideModal from "../components/SizeGuideModal";
import ProductoCard, { Product } from "../components/ProductoCard";
import {
  rebelTshirts,
  rebelSweaters,
  naughtyTshirts,
  naughtySweaters,
} from "../data/products";

const productosData: Record<string, Product[]> = {
  "Cabras Rebeldes-Camisetas": rebelTshirts,
  "Cabras Rebeldes-Sudaderas": rebelSweaters,
  "Cabras Traviesas-Camisetas": naughtyTshirts,
  "Cabras Traviesas-Sudaderas": naughtySweaters,
};

export default function ProductosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Cabras Rebeldes-Camisetas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [likes, setLikes] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [isDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    if (sidebarOpen && window.innerWidth < 768) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  const handleZoomMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const isLiked = (id: number) => likes.some((p) => p.id === id);

  const toggleLike = (product: Product) => {
    setLikes((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const addToCart = (product: Product) => {
    if (!selectedSize) return alert("Selecciona una talla");
    const productoFinal = { ...product, quantity, size: selectedSize };
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = [...currentCart, productoFinal];
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryClick = (key: string) => {
    setCategoriaActiva(key);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const underlineClass =
    "relative text-left w-fit transition-all duration-100 hover:after:w-full after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#67b2c1] after:via-[#ff8eaa] after:to-[#f6bd6b] after:rounded after:transition-all after:duration-700";

  return (
    <div className="relative">
      {!sidebarOpen && (
        <div className="md:hidden fixed top-28 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full bg-black text-white"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      )}

      {!sidebarOpen && (
        <div className="hidden md:block fixed top-32 left-2 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:ring-2 hover:ring-black/20 transition bg-white shadow-md"
            aria-label="Mostrar menú"
          >
            <Image
              src="/images/icons8-izquierda-24.png"
              alt="Mostrar"
              width={16}
              height={16}
              className="rotate-180"
            />
          </button>
        </div>
      )}

      <div className="flex pt-28 min-h-screen w-full">
      <aside
        className={`z-50 bg-white text-black transition-transform duration-300 ease-in-out
        md:sticky md:top-28 md:h-[calc(100vh-7rem)] md:w-64 md:shadow-[2px_0_1px_-1px_rgba(0,0,0,0.2)] md:overflow-y-auto
        fixed md:static top-28 left-0 w-full max-h-[calc(100vh-7rem)] p-6 overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

          <h2 className="text-lg font-bold mb-6">Categorías</h2>
          <ul className="space-y-4">
            {[
              { label: "Cabras Rebeldes", sub: ["Camisetas", "Sudaderas"] },
              { label: "Cabras Traviesas", sub: ["Camisetas", "Sudaderas"] },
            ].map((section) => (
              <li key={section.label}>
                <button
                  onClick={() => {
                    toggleSection(section.label);
                    setSelectedMain(section.label);
                  }}
                  className={`${underlineClass} font-bold ${selectedMain === section.label ? "after:w-full" : ""}`}
                >
                  {section.label}
                </button>
                {openSections[section.label] && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {section.sub.map((item) => {
                      const key = `${section.label}-${item}`;
                      return (
                        <li key={key}>
                          <button
                            onClick={() => handleCategoryClick(key)}
                            className={`${underlineClass} text-sm ${
                              categoriaActiva === key
                                ? "after:w-full font-semibold text-black"
                                : "text-gray-600"
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-black text-white"
            aria-label="Cerrar menú"
          >
            ✕
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="hidden md:flex absolute top-4 right-1 w-8 h-8 items-center justify-center group transition"
            aria-label="Ocultar menú"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[2px] group-hover:border-gradient-to-r group-hover:from-[#67b2c1] group-hover:via-[#ff8eaa] group-hover:to-[#f6bd6b] transition-all duration-500"></span>
            <Image
              src="/images/icons8-izquierda-24.png"
              alt="Ocultar"
              width={16}
              height={16}
              className="relative z-10"
            />
          </button>
        </aside>

        <main
          className={`transition-all duration-300 px-4 py-6 grid gap-6 w-full
            ${sidebarOpen 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" 
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            }
            ${sidebarOpen ? "md:grid" : "grid"} 
            ${sidebarOpen ? "hidden md:grid" : "grid"}
          `}
        >
          {productosData[categoriaActiva]?.map((product) => (
            <ProductoCard
              key={product.id}
              product={product}
              isLiked={isLiked(product.id)}
              onToggleLike={() => toggleLike(product)}
              onOpenModal={() => setSelectedProduct(product)}
            />
          ))}
        </main>
      </div>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          selectedSize={selectedSize}
          quantity={quantity}
          zoom={zoom}
          zoomPosition={zoomPosition}
          isDarkMode={isDarkMode}
          isLiked={isLiked(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct)}
          onSelectSize={setSelectedSize}
          onZoomMove={handleZoomMove}
          onToggleLike={() => toggleLike(selectedProduct)}
          onShowSizeGuide={() => setShowSizeGuideModal(true)}
          onQuantityChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      )}

      {showSizeGuideModal && <SizeGuideModal onClose={() => setShowSizeGuideModal(false)} />}
    </div>
  );
}
