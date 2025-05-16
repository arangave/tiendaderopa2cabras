"use client";
import React, { useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import "../styles/globals.css";
import ZoomableImageModal from "./ZoomableImageModal";
import { Product } from "./ProductoCard"; 


interface ModalProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  zoom: boolean;
  zoomPosition: { x: number; y: number };
  isDarkMode: boolean;
  isLiked: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  onSelectSize: (size: string) => void;
  onZoomMove: (e: React.MouseEvent<HTMLImageElement>) => void;
  onToggleLike: () => void;
  onShowSizeGuide: () => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Modal: React.FC<ModalProps> = ({
  product,
  selectedSize,
  quantity,
  zoom,
  zoomPosition,
  isLiked,
  onClose,
  onAddToCart,
  onSelectSize,
  onZoomMove,
  onToggleLike,
  onShowSizeGuide,
  onQuantityChange,
}) => {
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const handleZoomToggle = () => setShowZoomModal((prev) => !prev);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-none bg-opacity-50 z-[9999]">
      <div className="modal-glow bg-white p-3 md:p-6 rounded-lg shadow-lg w-[95%] max-w-xs sm:max-w-sm md:max-w-2xl relative z-10 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center z-50 group hover:scale-110 transition"
          aria-label="Cerrar modal"
        >
          <div className="relative w-5 h-5">
            <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute rotate-45 top-2 left-0" />
            <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute -rotate-45 top-2 left-0" />
          </div>
        </button>

        {/* Imagen producto */}
        <div className="relative w-[200px] h-[180px] md:w-[260px] md:h-[300px] overflow-hidden rounded-md">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className={`object-cover object-center transition-transform duration-300 cursor-crosshair ${
              zoom ? "scale-[2]" : "scale-100"
            }`}
            onMouseMove={onZoomMove}
            onClick={handleZoomToggle}
            style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-2 md:space-y-4 w-full md:w-1/2 text-black">
          <h2 className="text-sm md:text-2xl font-bold text-center md:text-left">{product.name}</h2>
          <p className="text-xs md:text-base text-gray-600 text-center md:text-left">{product.description}</p>
          <p className="text-sm md:text-xl font-bold text-center md:text-left">{product.price}</p>

          {/* Cantidad */}
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <label htmlFor="quantity" className="text-xs md:text-lg">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={onQuantityChange}
              min="1"
              className="w-14 p-1 md:p-2 border rounded-md text-center"
            />
          </div>

          {/* Talla */}
          <div className="flex flex-col space-y-1 md:space-y-2 w-full">
            <label className="text-xs md:text-lg text-left ml-4 md:ml-0">Talla:</label>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className={`px-2 py-1 border rounded-md text-xs md:text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colores */}
          {Array.isArray(product.colors) && product.colors.length > 0 && (
            <div className="mt-2">
              <label className="text-xs md:text-lg block mb-1">Color:</label>
              <div className="flex gap-2 justify-center md:justify-start">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition"
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    onClick={() => setSelectedImage(color.image)}
                  />
                ))}
              </div>
            </div>
          )}


          {/* Guía de tallas */}
          <div className="w-full flex justify-center md:justify-center mt-1">
            <button
              onClick={onShowSizeGuide}
              className="text-xs md:text-base relative text-black font-semibold transition duration-300 hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#67b2c1] after:via-[#ff8eaa] after:to-[#f6bd6b] after:rounded after:transition-all"
            >
              Guía de Tallas
            </button>
          </div>

          {/* Acciones */}
          <div className="w-full flex justify-center items-center gap-3 md:gap-4 md:justify-center mt-3">
            <button
              onClick={onAddToCart}
              className="w-[140px] ml-9 md:ml-14 md:w-[180px] px-3 py-1.5 md:px-6 md:py-2 bg-black text-white text-xs md:text-base font-semibold rounded-md transition-all duration-300 hover:scale-95 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b]"
            >
              Añadir a la cesta
            </button>
            <button
              onClick={onToggleLike}
              aria-label="Me gusta"
              className="p-1 md:p-2 hover:scale-110 transition"
            >
              {isLiked ? (
                <HeartIconSolid
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ fill: "url(#grad)", stroke: "none" }}
                />
              ) : (
                <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Zoom modal (opcional) */}
      {showZoomModal && (
        <ZoomableImageModal
          imageSrc={selectedImage}
          alt={product.name}
          onClose={handleZoomToggle}
        />
      )}
    </div>
  );
};

export default Modal;
