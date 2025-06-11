// app/components/Modal.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import "../styles/globals.css";
import ZoomableImageModal from "./ZoomableImageModal";
import type { Product } from "../data/products";
import ColorCircle from "./ColorCircle";

interface ModalProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  zoom: boolean;
  zoomPosition: { x: number; y: number };
  isDarkMode: boolean;
  isLiked: boolean;
  onClose: () => void;
  onAddToCart: (fraseSeleccionada?: string, colorSeleccionado?: string) => void;
  onSelectSize: (size: string) => void;
  onZoomMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onToggleLike: () => void;
  onShowSizeGuide: () => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const frasesCabrunas = [
  "“A veces solo necesitas dos cabras con traje para conquistar el mundo.”",
  "“El éxito es cuestión de actitud... y de cuernos.”",
  "“No sigas el rebaño, vístete diferente.”",
  "“Cabras y trajes: combinación ganadora.”",
  "“El sistema teme a las cabras con estilo.”",
  "“Si la vida te da un rebaño, sé la cabra con más flow.”",
  "“Donde todos ven reglas, nosotros vemos cuernos.”",
  "“Las cabras con traje saltan más alto.”",
  "“Ponle traje a tus ideas y deja que las cabras las lleven lejos.”",
  "“Rompe el molde, luce los cuernos.”",
  "“No hace falta seguir al pastor si puedes liderar el rebaño.”",
  "“La moda es pasajera, los cuernos son para siempre.”",
  "“La rebeldía se lleva mejor en traje.”",
  "“No temas destacar, teme ser normal.”",
  "“En un mundo de ovejas, sé cabra con corbata.”",
  "“A veces para escalar hay que tener cuernos… y un buen traje.”",
  "“Lo imposible es solo lo que no ha intentado una cabra con traje.”",
  "“Si nadie te entiende, es que ya vas por delante.”",
  "“El éxito se mide en saltos, no en pasos.”",
  "“Haz ruido, deja huella, lleva traje.”",
  "“Los sueños grandes piden trajes a medida… y cuernos afilados.”",
  "“Atrévete a desentonar, ahí está la magia.”"
];

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
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const handleZoomToggle = () => setShowZoomModal((prev) => !prev);

  const [tipoFrase, setTipoFrase] = useState<"random" | "personal" | "ia" | "ninguna">("ninguna");
  const [frasePersonal, setFrasePersonal] = useState("");
  const [fraseIA, setFraseIA] = useState("");
  const [preguntaIA, setPreguntaIA] = useState("");
  const [loadingIA, setLoadingIA] = useState(false);
  const [fraseRandom, setFraseRandom] = useState("");

  const handleRandomFrase = () => {
    setFraseRandom("");
    setTimeout(() => {
      const frase = frasesCabrunas[Math.floor(Math.random() * frasesCabrunas.length)];
      setFraseRandom(frase);
    }, 400);
  };

  const handleFraseIA = async () => {
    setLoadingIA(true);
    setFraseIA("");
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: preguntaIA }),
      });
      const data = await res.json();
      setFraseIA(data.frase || "No se pudo generar la frase.");
    } catch {
      setFraseIA("Error generando la frase.");
    }
    setLoadingIA(false);
  };

  let fraseSeleccionada = "";
  if (tipoFrase === "random" && fraseRandom) fraseSeleccionada = fraseRandom;
  if (tipoFrase === "personal" && frasePersonal) fraseSeleccionada = frasePersonal;
  if (tipoFrase === "ia" && fraseIA) fraseSeleccionada = fraseIA;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-none bg-opacity-50 z-[9999]">
      <div
        className="modal-glow bg-white py-4 px-3 md:py-8 md:px-6 rounded-lg shadow-lg w-[95%] max-w-xs sm:max-w-sm md:max-w-3xl relative z-10 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4"
      >
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

        <div className="flex flex-col items-center w-full md:w-auto">
          <div className="relative w-[150px] h-[130px] md:w-[260px] md:h-[300px] overflow-hidden rounded-md">
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

          <div className="flex flex-col items-center w-full my-2">
            <div
              className="bg-gray-100 rounded-lg p-3 flex flex-col gap-2 items-center"
              style={{ width: "200px", maxWidth: "100%" }}
            >
              <label className="font-semibold text-sm mb-1 text-black w-full text-center">
                Personaliza tu camiseta con una frase:
              </label>
              <select
                className="p-2 rounded border text-xs font-semibold bg-white text-black w-full"
                value={tipoFrase}
                onChange={(e) => {
                  const val = e.target.value as "ninguna" | "random" | "personal" | "ia";
                  setTipoFrase(val);
                  if (val === "random") handleRandomFrase();
                }}
              >
                <option value="ninguna">Sin frase</option>
                <option value="random">Frase random</option>
                <option value="personal">Tu propia frase</option>
                <option value="ia">Frase IA</option>
              </select>

              {tipoFrase === "random" && fraseRandom && (
                <div className="mt-1 text-xs text-center font-semibold italic bg-white rounded px-2 py-2 shadow w-full text-black">
                  "{fraseRandom}"
                </div>
              )}
              {tipoFrase === "personal" && (
                <input
                  className="border rounded px-2 py-1 text-xs w-full mt-1 text-black"
                  type="text"
                  maxLength={80}
                  placeholder="Escribe tu frase aquí..."
                  value={frasePersonal}
                  onChange={(e) => setFrasePersonal(e.target.value)}
                />
              )}
              {tipoFrase === "ia" && (
                <div className="flex flex-col gap-1 mt-1 w-full">
                  <input
                    className="border rounded px-2 py-1 text-xs w-full text-black"
                    type="text"
                    maxLength={80}
                    placeholder="¿Qué te quita el sueño?"
                    value={preguntaIA}
                    onChange={(e) => setPreguntaIA(e.target.value)}
                  />
                  <button
                    onClick={handleFraseIA}
                    className="bg-black text-white text-xs px-2 py-1 rounded hover:bg-gray-800 disabled:opacity-60 w-full"
                    disabled={!preguntaIA.trim() || loadingIA}
                  >
                    {loadingIA ? "Generando..." : "Generar frase IA"}
                  </button>
                  {fraseIA && (
                    <div className="mt-1 text-xs text-center font-semibold italic bg-white rounded px-2 py-2 shadow w-full text-black">
                      "{fraseIA}"
                    </div>
                  )}
                </div>
              )}
            </div>
            <style jsx>{`
              @media (min-width: 768px) {
                div.bg-gray-100 {
                  width: 260px !important;
                }
              }
            `}</style>
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:space-y-4 w-full md:w-1/2 text-black max-h-[80vh] overflow-y-auto mt-2 md:mt-0">
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
              className="w-14 p-1 md:p-2 border rounded-md text-center text-black"
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

          {Array.isArray(product.colors) && product.colors.length > 0 && (
            <div className="mt-2">
              <label className="text-xs md:text-lg block mb-1">Color:</label>
              <div className="flex gap-2 justify-center md:justify-start">
                {product.colors.map((colorObj, index) => (
                  <button
                    key={index}
                    className="rounded-full border border-gray-300 hover:scale-110 transition p-0"
                    style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "none" }}
                    aria-label={colorObj.name}
                    onClick={() => {
                      setSelectedImage(colorObj.image);
                      setSelectedColor(colorObj.name);
                    }}
                  >
                    <ColorCircle
                      hex={colorObj.hex}
                      size={28}
                      selected={selectedColor === colorObj.name}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex justify-center items-center gap-3 md:gap-4 md:justify-center mt-3">
            <button
              onClick={() => onAddToCart(fraseSeleccionada, selectedColor)}
              className="w-[140px] ml-9 md:ml-14 md:w-[180px] px-3 py-1.5 md:px-6 md:py-2 bg-black text-white text-xs md:text-base font-semibold rounded-md transition-all duration-300 hover:scale-95 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b]"
            >
              Añadir a la cesta
            </button>
            <button
              onClick={onToggleLike}
              aria-label="Me gusta"
              className="p-1 md:p-2 hover:scale-105 transition-transform"
            >
              {isLiked ? (
                <HeartIconSolid
                  className="w-4 h-4 md:w-5 md:h-5"
                  style={{ fill: "url(#grad)", stroke: "none" }}
                />
              ) : (
                <HeartIcon className="w-4 h-4 md:w-5 md:h-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

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
