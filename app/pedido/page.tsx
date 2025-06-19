"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PedidoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cp, setCp] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("cart");
    setMensaje("✅ ¡Tu pedido ha sido enviado con éxito!");
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const campos = [
    { id: "nombre", label: "Nombre completo", value: nombre, setter: setNombre, type: "text" },
    { id: "email", label: "Email", value: email, setter: setEmail, type: "email" },
    { id: "direccion", label: "Dirección", value: direccion, setter: setDireccion, type: "text" },
    { id: "ciudad", label: "Ciudad", value: ciudad, setter: setCiudad, type: "text" },
    { id: "cp", label: "Código Postal", value: cp, setter: setCp, type: "text" },
    { id: "telefono", label: "Teléfono", value: telefono, setter: setTelefono, type: "text" },
  ];

  return (
    <main className="relative min-h-screen flex items-start justify-center pt-40 pb-16 px-6 overflow-hidden">
      <video
        src="/videos/Proyecto de vídeo 5.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative w-full max-w-md mx-auto p-8 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md">
        <h1
          className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent
                     bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
        >
          Datos de Envio
        </h1>

        {mensaje && (
          <div className="mb-4 p-3 bg-green-800 text-white rounded text-center">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {campos.map(({ id, label, value, setter, type }) => (
            <div key={id} className="relative">
              <input
                id={id}
                type={type}
                required
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder=" "
                className="
                  peer
                  block w-full bg-transparent border-b-2 border-white/50
                  py-2 px-0 text-white placeholder-transparent
                  focus:outline-none focus:border-white transition-colors duration-200
                "
              />
              <label
                htmlFor={id}
                className="
                  absolute left-0 top-2 text-white/70
                  peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white
                  transition-all duration-200
                "
              >
                {label}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]
                       text-white font-bold hover:opacity-90 transition-opacity duration-300 cursor-pointer"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </main>
  );
}
