"use client";
import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Product } from "./ProductoCard";
import "../styles/globals.css";
import ZoomableImageModal from "./ZoomableImageModal";


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
  //isDarkMode,
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
  
  const [showZoomModal, setShowZoomModal] = React.useState(false);
  const handleZoomToggle = () => setShowZoomModal((prev) => !prev);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-none bg-opacity-50 z-[9999]">
      <div className="modal-glow bg-white p-3 md:p-6 rounded-lg shadow-lg w-[95%] max-w-xs sm:max-w-sm md:max-w-2xl relative z-10 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
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

        <div className="relative w-[200px] h-[240px] md:w-[260px] md:h-[420px] overflow-hidden rounded-md">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover object-center transition-transform duration-300 cursor-crosshair ${
              zoom ? "scale-[2]" : "scale-100"
            }`}
            onMouseMove={onZoomMove}
            onClick={handleZoomToggle}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>

        <div className="flex flex-col space-y-2 md:space-y-4 w-full md:w-1/2">
          <h2 className="text-sm md:text-2xl font-bold text-center md:text-left">{product.name}</h2>
          <p className="text-xs md:text-base text-gray-600 text-center md:text-left">{product.description}</p>
          <p className="text-sm md:text-xl font-bold text-center md:text-left">{product.price}</p>

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

          <div className="w-full flex justify-center md:justify-center mt-1">
            <button
              onClick={onShowSizeGuide}
              className="text-xs md:text-base relative text-black font-semibold transition duration-300 hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#67b2c1] after:via-[#ff8eaa] after:to-[#f6bd6b] after:rounded after:transition-all"
            >
              Guía de Tallas
            </button>
          </div>

          <div className="w-full flex justify-center items-center gap-3 md:gap-4 md:justify-center mt-3">
            <button
              onClick={onAddToCart}
              className="w-[140px] ml-9 md:ml-14 md:w-[180px] px-3 py-1.5 md:px-6 md:py-2 bg-black text-white text-xs md:text-base font-semibold rounded-md transition-all duration-300 hover:scale-95 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b] hover:text-white"
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
                  className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300"
                  style={{ fill: "url(#grad)", stroke: "none" }}
                />
              ) : (
                <HeartIcon className="w-5 h-5 md:w-6 md:h-6 text-black transition-all duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      {showZoomModal && (
  <ZoomableImageModal
    imageSrc={product.image}
    alt={product.name}
    onClose={handleZoomToggle}
  />
)}

    </div>
  );
};

export default Modal;
