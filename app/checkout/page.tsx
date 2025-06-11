"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// PASOS DEL CHECKOUT
const steps = ["Datos", "Pedido", "Pago"];

// Provincias de España
const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
  "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
  "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Illes Balears",
  "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid",
  "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Segovia",
  "Sevilla", "Soria", "Tarragona", "Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia",
  "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    cp: "",
    poblacion: "",
    provincia: "",
    telefono: "",
    email: "",
    crearCuenta: false,
    notas: ""
  });

  // Cart desde localStorage (simulado)
  const [cart, setCart] = useState<any[]>([]);
  const [envio, setEnvio] = useState("normal"); // normal o express
  const [pago, setPago] = useState("tarjeta");
  const [acepto, setAcepto] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, []);

  // Precios
  const envioPrecio = envio === "express" ? 4.95 : 0;
  const subtotal = cart.reduce((sum, p) => sum + (parseFloat(p.price) || 0) * (p.quantity || 1), 0);
  const total = subtotal + envioPrecio;
  const IVA = +(total * 0.21).toFixed(2);

  // Cambios en inputs
  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Siguiente paso con validación
  const handleNext = () => {
    if (step === 0) {
      const required = ["nombre", "apellidos", "direccion", "cp", "poblacion", "provincia", "telefono", "email"];
      for (const field of required) {
        if (!form[field as keyof typeof form]) {
          alert("Por favor, rellena todos los campos obligatorios.");
          return;
        }
      }
    }
    if (step === 2 && !acepto) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  // Enviar (simulado)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!acepto) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    setPedidoConfirmado(true);
    setTimeout(() => {
      localStorage.removeItem("cart");
    }, 2000);
  };

  // Pantalla de confirmación
  if (pedidoConfirmado) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        <video
          src="/videos/Proyecto de vídeo 5.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Opacidad negra encima del video */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`w-3 h-3 rounded-full border border-white/80 ${step === i ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" : "bg-white/30"} transition`}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-md mx-auto rounded-2xl p-10 bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl flex flex-col items-center gap-6"
        >
          <div className="text-5xl mb-2">✅</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">¡Pedido realizado!</h2>
          <p className="text-lg text-white/90 text-center">Gracias por tu compra. Te hemos enviado la confirmación por correo electrónico.</p>
          <button
            className="mt-4 rounded-full px-8 py-2 font-bold text-lg bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white shadow hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l hover:from-[#ff8eaa] hover:to-[#67b2c1] transition-all"
            onClick={() => window.location.href = "/inicio"}
          >
            Ir al inicio
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-40 pb-16 px-6 overflow-hidden">
      <video
        src="/videos/Proyecto de vídeo 5.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      {/* Puntos de pasos SIEMPRE visibles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {steps.map((s, i) => (
          <span
            key={s}
            className={`w-3 h-3 rounded-full border border-white/80 ${step === i ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" : "bg-white/30"} transition`}
          />
        ))}
      </div>
      {/* TARJETA PRINCIPAL */}
      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="
            relative z-10 w-full max-w-xl mx-auto
            rounded-2xl p-6 md:p-10
            bg-white/10 backdrop-blur-md
            border border-white/30 shadow-2xl
            flex flex-col md:flex-row gap-8
            hover:shadow-[0_0_40px_4px_rgba(255,168,105,0.18)]
            transition
          "
        >
          {/* PASO 1: DATOS */}
          {step === 0 && (
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Facturación y Envío</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nombre *" name="nombre" value={form.nombre} onChange={handleInput} />
                <InputField label="Apellidos *" name="apellidos" value={form.apellidos} onChange={handleInput} />
                <InputField label="Dirección de la calle *" name="direccion" value={form.direccion} onChange={handleInput} className="md:col-span-2" />
                <InputField label="Código postal *" name="cp" value={form.cp} onChange={handleInput} />
                <InputField label="Población *" name="poblacion" value={form.poblacion} onChange={handleInput} />
                <div className="relative mb-4">
                  <select
                    name="provincia"
                    className="w-full bg-transparent border-0 border-b border-white/60 focus:border-[#67b2c1] rounded-none py-2 px-3 text-white outline-none transition appearance-none"
                    value={form.provincia}
                    onChange={handleInput}
                    required
                  >
                    <option value="" className="bg-black text-white">Provincia *</option>
                    {provincias.map((prov) => (
                      <option key={prov} value={prov} className="bg-black text-white">{prov}</option>
                    ))}
                  </select>
                  {/* Solo muestra el label si hay una provincia seleccionada */}
                  {form.provincia && (
                    <label
                      htmlFor="provincia"
                      className={`
                        absolute left-4 pointer-events-none text-white/80 transition-all duration-200 bg-transparent
                        text-xs -top-3 px-1 bg-black/60
                      `}
                      style={{ zIndex: 2 }}
                    >
                      Provincia *
                    </label>
                  )}
                </div>
                <InputField label="Teléfono *" name="telefono" value={form.telefono} onChange={handleInput} />
                <InputField label="Correo electrónico *" name="email" type="email" value={form.email} onChange={handleInput} />
              </div>
              <div className="flex items-center mt-3">
                <input type="checkbox" name="crearCuenta" checked={form.crearCuenta} onChange={handleInput} className="accent-[#ff8eaa] mr-2" />
                <label className="text-white/90 cursor-pointer select-none">¿Crear una cuenta?</label>
              </div>
              <div className="mt-4">
                <label className="text-white/80 mb-1 block">Notas del pedido (opcional)</label>
                <textarea
                  name="notas"
                  className="w-full bg-transparent border-0 border-b border-white/60 focus:border-[#67b2c1] rounded-none py-2 px-3 text-white placeholder-white/70 outline-none transition"
                  placeholder="Notas sobre tu pedido..."
                  value={form.notas}
                  onChange={handleInput}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* PASO 2 y PASO 3 igual que ya tienes... */}
          {/* ... copia igual que en tu código anterior ... */}

          {/* BOTONES DE NAVEGACIÓN */}
          <div className="absolute bottom-7 right-7 flex gap-4 z-10">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-full px-6 py-2 font-semibold bg-white/30 text-white text-lg shadow hover:scale-105 hover:shadow-lg border border-white/40 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b] hover:text-black transition-all"
              >
                Atrás
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full px-8 py-2 font-bold text-lg bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white shadow hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l hover:from-[#ff8eaa] hover:to-[#67b2c1] transition-all"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full px-8 py-2 font-bold text-lg bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white shadow hover:scale-105 hover:shadow-lg hover:bg-gradient-to-l hover:from-[#ff8eaa] hover:to-[#67b2c1] transition-all"
              >
                Realizar Pedido
              </button>
            )}
          </div>
        </motion.form>
      </AnimatePresence>
    </main>
  );
}

// INPUT CON FLOATING LABEL Y SOLO LÍNEA INFERIOR
function InputField({ label, name, value, onChange, type = "text", className = "" }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`relative mb-4 ${className}`}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        className={`
          peer w-full bg-transparent border-0 border-b border-white/60 focus:border-[#67b2c1]
          rounded-none text-white placeholder-transparent py-2 px-3
          outline-none transition-all text-base
        `}
        placeholder={label}
        required={label.includes("*")}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-3 pointer-events-none text-white/80 transition-all duration-200 bg-transparent
          ${focused || value ? "text-xs -top-3 px-1 bg-black/60" : "text-base top-4"}
        `}
        style={{ zIndex: 2 }}
      >
        {label}
      </label>
    </div>
  );
}

// OPCIÓN DE RADIO PARA PAGO
function PaymentOption({ label, value, checked, onChange, icon }: any) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 cursor-pointer
      ${checked ? "ring-2 ring-[#67b2c1] shadow-md" : "hover:bg-white/20"} transition`}
    >
      <input
        type="radio"
        name="metodo"
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[#67b2c1] mr-2"
      />
      <span className="font-semibold text-white text-lg">{label} {icon}</span>
      {value === "tarjeta" && checked && (
        <span className="ml-2 px-2 py-1 rounded bg-white/20 text-white text-xs">Esta es la opción de la pasarela de pago con tarjeta.</span>
      )}
    </label>
  );
}
