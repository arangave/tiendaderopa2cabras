"use client";
import { useState, useEffect } from "react";

export default function CookiesModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Opcional: si quieres que el modal se muestre solo si no ha aceptado o rechazado antes
  useEffect(() => {
    const preference = localStorage.getItem("cookie-preference");
    if (!preference) {
      setIsOpen(false); // ábrelo automáticamente si quieres
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-preference", "accepted");
    setIsOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-preference", "rejected");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-[#67b2c1] underline transition text-xs text-gray-500"
      >
        Cookies
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-xl relative text-sm">
            <h2 className="text-xl font-semibold text-[#67b2c1] mb-2">
              Política de Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              Utilizamos cookies para mejorar tu experiencia. Puedes aceptar todas o rechazarlas si
              lo prefieres.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Cookies necesarias para el funcionamiento básico.</li>
              <li>Cookies analíticas (para estadísticas y rendimiento).</li>
              <li>Cookies de personalización y preferencias.</li>
            </ul>
            <p className="text-gray-600 text-xs mb-6">
              Puedes cambiar tu decisión más adelante desde la configuración de tu navegador.
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleReject}
                className="w-1/2 py-2 px-4 border border-gray-300 text-gray-700 rounded-xl hover:border-[#ff8eaa] transition"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="w-1/2 py-2 px-4 bg-[#67b2c1] text-white rounded-xl hover:bg-[#ff8eaa] transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
