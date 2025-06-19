"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface ZoomableImageModalProps {
  imageSrc: string;
  alt: string;
  onClose: () => void;
}

const ZoomableImageModal: React.FC<ZoomableImageModalProps> = ({
  imageSrc,
  alt,
  onClose,
}) => {
  const [scale, setScale] = useState(1.8);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.max(1, prev + delta));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-[10000] flex justify-center items-center"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center z-50 group hover:scale-110 transition  cursor-pointer"
        aria-label="Cerrar"
      >
        <div className="relative w-5 h-5">
          <span className="block w-full h-[2px] bg-white rounded absolute rotate-45 top-2 left-0" />
          <span className="block w-full h-[2px] bg-white rounded absolute -rotate-45 top-2 left-0" />
        </div>
      </button>

      <div className="absolute top-4 left-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setScale((s) => s + 0.5)}
          className="bg-white text-black font-bold px-2 py-1 rounded hover:scale-105 transition cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => setScale((s) => Math.max(1, s - 0.5))}
          className="bg-white text-black font-bold px-2 py-1 rounded hover:scale-105 transition cursor-pointer"
        >
          –
        </button>
        <button
            onClick={() => {
                const isMobile = window.innerWidth < 768;
                setScale(isMobile ? 1.8 : 1.1);
                setPosition({ x: 0, y: 0 });
            }}
            className="bg-white text-black text-xs px-2 py-1 rounded hover:scale-105 transition cursor-pointer"
            >
            Reset
            </button>

      </div>

      <div
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out"

          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <Image
            src={imageSrc}
            alt={alt}
            width={800}
            height={800}
            className="object-contain max-h-[90vh] pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ZoomableImageModal;
