"use client";
import React from "react";

interface Props {
  onClose: () => void;
}

const SizeGuideModal: React.FC<Props> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-60 text-black">
    <div className="bg-white  max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center z-50 group hover:scale-110 transition cursor-pointer"
        aria-label="Cerrar guía de tallas"
      >
        <div className="relative w-5 h-5">
          <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute rotate-45 top-2 left-0" />
          <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute -rotate-45 top-2 left-0" />
        </div>
      </button>

      <h2 className="text-xl font-bold mb-4">Guía de Tallas</h2>
      <table className="w-full text-sm border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Talla</th>
            <th className="p-2 border">UE</th>
            <th className="p-2 border">Pecho</th>
            <th className="p-2 border">Cintura</th>
            <th className="p-2 border">Cadera</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["XXS", "32", "74-77 cm", "61-63 cm", "83-85 cm"],
            ["XS", "34", "78-81 cm", "62-64 cm", "86-89 cm"],
            ["S", "36", "82-85 cm", "65-67 cm", "93-96 cm"],
            ["M", "38", "86-89 cm", "68-71 cm", "97-100 cm"],
            ["L", "40", "90-93 cm", "72-75 cm", "101-104 cm"],
            ["XL", "42", "94-97 cm", "76-79 cm", "105-107 cm"],
            ["XXL/2XL", "44", "98-101 cm", "80-84 cm", "108-112 cm"],
          ].map(([size, eu, chest, waist, hips]) => (
            <tr key={size}>
              <td className="p-2 border">{size}</td>
              <td className="p-2 border">{eu}</td>
              <td className="p-2 border">{chest}</td>
              <td className="p-2 border">{waist}</td>
              <td className="p-2 border">{hips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SizeGuideModal;

