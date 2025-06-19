"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMensaje(data.message || "¡Te has suscrito!");
        setEmail("");
      } else {
        setMensaje(data.error || data.message || "Error");
      }
    } catch {
      setMensaje("Error de red o del servidor.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Tu correo electrónico"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition text-black cursor-pointer"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn shadow-md shadow-black/40 hover:shadow-lg hover:shadow-black/20 transition duration-300 cursor-pointer "
      >
        {loading ? "Enviando..." : "Unirme"}
      </button>
      {mensaje && (
        <div className="mt-2 text-center text-black bg-gray-100 rounded px-2 py-1 text-sm ">
          {mensaje}
        </div>
      )}
    </form>
  );
}
