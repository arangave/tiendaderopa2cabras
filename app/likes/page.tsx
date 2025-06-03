// app/likes/page.tsx
"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import ProductoCard from "../components/ProductoCard";
import Modal from "../components/Modal";
import SizeGuideModal from "../components/SizeGuideModal";
import type { Product } from "../data/products";

export default function LikesPage() {
  const [likes, setLikes] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");          // *** Añadido ***
  const [fraseSeleccionada, setFraseSeleccionada] = useState<string>("");  // *** Añadido ***
  const [quantity, setQuantity] = useState<number>(1);
  const [zoom, setZoom] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1) Cargar favoritos y carrito desde localStorage al montar
  useEffect(() => {
    const storedLikes = localStorage.getItem("favorites");
    const storedCart = localStorage.getItem("cart");
    if (storedLikes) setLikes(JSON.parse(storedLikes));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // 2) Sincronizar localStorage cada vez que cambian los likes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(likes));
  }, [likes]);

  // 3) Sincronizar localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const isProductLiked = (id: number) => likes.some((p) => p.id === id);

  // 4) toggleLike añade o quita favoritos
  const toggleLike = (product: Product) => {
    setLikes((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        // Si ya está en favoritos, lo quitamos
        return prev.filter((p) => p.id !== product.id);
      } else {
        // Si no está, lo añadimos. Puede llevar color/phrase
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    showToast(
      isProductLiked(product.id)
        ? "Producto eliminado de favoritos ❌"
        : "Producto guardado en favoritos ❤️"
    );
  };

  // 5) Abrir y cerrar modal
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setZoom(false);
    setSelectedSize("");
    setSelectedColor("");          // reset al abrir modal
    setFraseSeleccionada("");      // reset al abrir modal
    setQuantity(1);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setZoom(false);
  };

  // 6) Mensaje toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 7) Añadir al carrito desde el modal
  const addToCart = (product: Product) => {
    if (!selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }
    const productWithOptions: Product = {
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      phrase: fraseSeleccionada,
    };
    const alreadyInCart = cart.some(
      (p) => p.id === product.id && p.size === selectedSize
    );
    if (alreadyInCart) {
      showToast("Este producto ya está en la cesta");
      return;
    }
    setCart((prev) => [...prev, productWithOptions]);
    showToast("Producto añadido a la cesta 🛒");
    closeModal();
  };

  // 8) Manejo del zoom en la imagen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // 9) Cambiar cantidad en el modal
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(newQty);
  };

  return (
    <main className="px-4 pt-16 pb-8 max-w-6xl mx-auto">
      <Header cartCount={cart.length} favoritesCount={likes.length} />

      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {toastMessage}
        </div>
      )}

      <h2 className="text-center text-3xl font-bold mb-6">Mis Favoritos</h2>

      {likes.length === 0 ? (
        <p className="text-center text-lg mt-20 text-gray-700">
          Aún no has añadido productos a favoritos ❤️
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {likes.map((product) => (
            <ProductoCard
              key={product.id}
              product={product}
              onOpenModal={openModal}
              onToggleLike={toggleLike}
              isLiked={isProductLiked(product.id)}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          selectedSize={selectedSize}
          quantity={quantity}
          zoom={zoom}
          zoomPosition={zoomPosition}
          isDarkMode={false}
          isLiked={isProductLiked(selectedProduct.id)}
          onClose={closeModal}
          onAddToCart={() => addToCart(selectedProduct)}
          onSelectSize={setSelectedSize}
          onZoomMove={handleMouseMove}
          onToggleLike={() => {
            // Aquí sí usamos las variables correctas: selectedColor y fraseSeleccionada
            const productWithExtras: Product = {
              ...selectedProduct,
              quantity,
              size: selectedSize || undefined,
              color: selectedColor || undefined,
              phrase: fraseSeleccionada || undefined,
            };
            toggleLike(productWithExtras);
          }}
          onShowSizeGuide={() => setShowSizeGuideModal(true)}
          onQuantityChange={handleQuantityChange}
          // AÑADIMOS dos props nuevas para que el modal pueda actualizar color y frase en el padre:

        />
      )}

      {showSizeGuideModal && <SizeGuideModal onClose={() => setShowSizeGuideModal(false)} />}
    </main>
  );
}
