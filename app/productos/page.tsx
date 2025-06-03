"use client";

import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import SizeGuideModal from "../components/SizeGuideModal";
import ProductoCard from "../components/ProductoCard";
import type { Product } from "../data/products";
import Sidebar from "../components/Sidebar";

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

  // Control overflow en móvil
  useEffect(() => {
    const body = document.body;
    if (sidebarOpen && window.innerWidth < 768) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  const isLiked = (id: number) => likes.some((p) => p.id === id);

  const toggleLike = (product: Product) => {
    setLikes((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  // Ahora recibe frase y color
  const addToCart = (product: Product, frase?: string, color?: string) => {
    if (!selectedSize) return alert("Selecciona una talla");
    const productoFinal = {
      ...product,
      quantity,
      size: selectedSize,
      phrase: frase,
      color: color,
    };
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...currentCart, productoFinal]));
    // Puedes cerrar modal si quieres:
    setSelectedProduct(null);
  };

  return (
    <div className="flex pt-28 flex-1 w-full">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
        openSections={openSections}
        toggleSection={(s) =>
          setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }))
        }
        selectedMain={selectedMain}
        setSelectedMain={setSelectedMain}
      />

      <main
        className={`transition-all duration-300 px-4 py-2 grid gap-6 pl-10 w-full
          grid-cols-1 sm:grid-cols-2
          ${
            sidebarOpen
              ? "md:grid-cols-3 lg:grid-cols-4 md:ml-64"
              : "md:grid-cols-3 lg:grid-cols-4"
          }
          ${
            sidebarOpen &&
            typeof window !== "undefined" &&
            window.innerWidth < 768
              ? "hidden"
              : ""
          }
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
          onAddToCart={(frase, color) =>
            addToCart(selectedProduct, frase, color)
          }
          onSelectSize={setSelectedSize}
          onZoomMove={(e) => {
            const { left, top, width, height } =
              e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomPosition({ x, y });
          }}
          onToggleLike={() => toggleLike(selectedProduct)}
          onShowSizeGuide={() => setShowSizeGuideModal(true)}
          onQuantityChange={(e) =>
            setQuantity(parseInt(e.target.value) || 1)
          }
        />
      )}

      {showSizeGuideModal && (
        <SizeGuideModal onClose={() => setShowSizeGuideModal(false)} />
      )}
    </div>
  );
}
