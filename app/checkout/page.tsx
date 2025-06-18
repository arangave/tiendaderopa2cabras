"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

// PASOS DEL CHECKOUT
const steps = [
  { name: "Datos" },
  { name: "Pedido" },
  { name: "Pago" }
];

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

  // Campos de pago
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    caducidad: "",
    cvc: ""
  });
  const [bizum, setBizum] = useState({ telefono: "" });

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

  // Cambios en inputs generales
  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  // Inputs de tarjeta y bizum
  const handleTarjetaInput = (e: any) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleBizumInput = (e: any) => {
    const { name, value } = e.target;
    setBizum((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Stepper click
  const goToStep = (i: number) => setStep(i);

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
    // Validaciones condicionales de pago
    if (step === 2) {
      if (pago === "tarjeta" && (!tarjeta.numero || !tarjeta.caducidad || !tarjeta.cvc)) {
        alert("Rellena todos los campos de la tarjeta.");
        return;
      }
      if (pago === "bizum" && !bizum.telefono) {
        alert("Introduce tu teléfono Bizum.");
        return;
      }
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
    if (pago === "tarjeta" && (!tarjeta.numero || !tarjeta.caducidad || !tarjeta.cvc)) {
      alert("Rellena todos los campos de la tarjeta.");
      return;
    }
    if (pago === "bizum" && !bizum.telefono) {
      alert("Introduce tu teléfono Bizum.");
      return;
    }
    setPedidoConfirmado(true);
    setTimeout(() => {
      localStorage.removeItem("cart");
    }, 2000);
  };

  // Confirmación final
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full flex justify-center">
          <Stepper step={step} goToStep={goToStep} />
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
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-2 md:px-8 bg-black overflow-x-hidden">
      {/* Fondo video y overlay */}
      <video
        src="/videos/Proyecto de vídeo 5.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* STEPPER: SIEMPRE CENTRADO ARRIBA */}
      <div className="w-full flex justify-center mt-2 mb-2 z-20">
        <Stepper step={step} goToStep={goToStep} />
      </div>

      {/* CARD: RESPONSIVE, SIEMPRE CENTRADA, MAX-W CONCRETO */}
      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
            className={`
            relative z-10 w-full
            ${step === 1
                ? "max-w-lg sm:max-w-2xl md:max-w-5xl xl:max-w-6xl px-4 md:px-8 py-4 md:py-6"
                : "max-w-lg sm:max-w-xl md:max-w-2xl px-4 md:px-6 py-4 md:py-5"}
            mx-auto rounded-2xl
            bg-white/10 backdrop-blur-md
            border border-white/30 shadow-2xl
            flex flex-col
            transition
            overflow-auto
            `}
        >
          {/* CONTENIDO */}
            <div className={`flex flex-col md:flex-row gap-8 items-center`}>

            {/* Columna izquierda */}
            <div className="flex-1 w-full">
              {step === 0 && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">Facturación y Envío</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Nombre *" name="nombre" value={form.nombre} onChange={handleInput} />
                    <InputField label="Apellidos *" name="apellidos" value={form.apellidos} onChange={handleInput} />
                    <InputField label="Dirección de la calle *" name="direccion" value={form.direccion} onChange={handleInput} className="md:col-span-2" />
                    <InputField label="Código postal *" name="cp" value={form.cp} onChange={handleInput} />
                    <InputField label="Población *" name="poblacion" value={form.poblacion} onChange={handleInput} />
                    <div className="relative mb-4">
                      <select
                        name="provincia"
                        className="w-full bg-transparent border-0 border-b border-white/60 focus:border-[#67b2c1] rounded-none py-2 px-0 text-white outline-none transition appearance-none"
                        value={form.provincia}
                        onChange={handleInput}
                        required
                      >
                        <option value="" className="bg-black text-white">Provincia *</option>
                        {provincias.map((prov) => (
                          <option key={prov} value={prov} className="bg-black text-white">{prov}</option>
                        ))}
                      </select>
                      {form.provincia && (
                        <label
                          htmlFor="provincia"
                          className={`
                            absolute left-0 pointer-events-none text-white/80 transition-all duration-200 bg-transparent
                            text-xs -top-3 px-0
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

                    <textarea
                      name="notas"
                      className="w-full bg-transparent border-0 border-b border-white/60 focus:border-[#67b2c1] rounded-none py-2 px-0 text-white placeholder-white/70 outline-none transition"
                      placeholder="Notas sobre tu pedido..."
                      value={form.notas}
                      onChange={handleInput}
                      rows={2}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center md:text-left">Método de Pago</h2>
                  <div className="flex flex-col gap-4 mb-6">
                    <PaymentOption label="Tarjeta" value="tarjeta" checked={pago === "tarjeta"} onChange={() => setPago("tarjeta")} />
                    <PaymentOption label="Bizum" value="bizum" checked={pago === "bizum"} onChange={() => setPago("bizum")} />
                    <PaymentOption label="PayPal" value="paypal" checked={pago === "paypal"} onChange={() => setPago("paypal")} icon={
                      <Image src="/images/paypal.svg" alt="PayPal" width={36} height={20} className="inline-block ml-1" />
                    } />
                  </div>
                  {pago === "tarjeta" && (
                    <div className="space-y-3 mb-4">
                      <InputField label="Número de tarjeta *" name="numero" value={tarjeta.numero} onChange={handleTarjetaInput} className="mb-2" />
                      <div className="flex gap-4">
                        <InputField label="Caducidad (MM/AA) *" name="caducidad" value={tarjeta.caducidad} onChange={handleTarjetaInput} className="flex-1 mb-2" />
                        <InputField label="CVC *" name="cvc" value={tarjeta.cvc} onChange={handleTarjetaInput} className="flex-1 mb-2" />
                      </div>
                    </div>
                  )}
                  {pago === "bizum" && (
                    <div className="space-y-3 mb-4">
                      <InputField label="Teléfono Bizum *" name="telefono" value={bizum.telefono} onChange={handleBizumInput} />
                    </div>
                  )}
                  {pago === "paypal" && (
                    <div className="mb-4 flex flex-col items-center">
                      <button
                        type="button"
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0070ba] to-[#003087] text-white font-bold flex items-center gap-2 shadow hover:scale-105 transition"
                        onClick={() => alert("Redirigiendo a PayPal... (fake)")}
                      >
                        <Image src="/images/paypal.svg" alt="PayPal" width={28} height={16} className="inline-block" />
                        Pagar con PayPal
                      </button>
                      <span className="text-xs text-white/60 mt-2">(Demo: este botón es solo visual)</span>
                    </div>
                  )}
                  <div className="text-xs text-white/70 mb-4">
                    Tus datos personales se utilizarán para procesar tu pedido y mejorar tu experiencia en 2CabrasConTraje, conforme a la política de privacidad.
                  </div>
                  <div className="flex items-center mb-5">
                    <input type="checkbox" checked={acepto} onChange={() => setAcepto(!acepto)} className="accent-[#ff8eaa] mr-2" />
                    <span className="text-white/90 text-sm">
                      He leído y acepto los{" "}
                      <a href="/legal" target="_blank" className="underline hover:text-[#67b2c1] transition">términos y condiciones de la web *</a>
                    </span>
                  </div>
                </>
              )}
            </div>
{step === 1 && (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center md:text-left">
      Tu Pedido
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24 items-center">
      {/* Productos (izquierda) */}
      <div className="md:max-w-2xl w-full">
        <div className="font-semibold text-lg text-white/90 grid grid-cols-7">
          <span className="col-span-4">Producto</span>
          <span className="col-span-1 text-center">Talla</span>
          <span className="col-span-2 text-right">Precio</span>
        </div>
        <div className="border-b border-white/20 mb-2" />
        {cart.length === 0 ? (
          <p className="text-white/70 text-center">Tu carrito está vacío</p>
        ) : (
          cart.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-7 gap-1 py-3 items-center text-white/90"
            >
              {/* Producto info */}
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover border border-white/20 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{item.name}</div>
                  <div className="text-xs truncate">
                    {item.color ? `Color: ${item.color}` : ""}
                  </div>
                  <div className="text-xs truncate">
                    {item.phrase ? `Frase: ${item.phrase}` : "Frase: Sin frase"}
                  </div>
                </div>
              </div>
              {/* Talla */}
              <div className="col-span-1 text-center font-bold">
                {item.size || "-"}
              </div>
              {/* Precio */}
              <div className="col-span-2 text-right font-semibold">
                {parseFloat(item.price).toFixed(2)}€
              </div>
            </div>
          ))
        )}
      </div>
      {/* Resumen (derecha) */}
      <div className="flex flex-col justify-start md:max-w-sm w-full md:ml-auto">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between text-white/90">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between items-center text-white/90">
            <span>
              Envío
              <span className="block text-xs mt-1">
                <label>
                  <input
                    type="radio"
                    checked={envio === "normal"}
                    onChange={() => setEnvio("normal")}
                    className="accent-[#67b2c1] mr-1"
                  />
                  GLS EconomyParcel (48/72h){" "}
                  <span className="font-bold">
                    {envio === "normal" ? "(Gratis)" : ""}
                  </span>
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    checked={envio === "express"}
                    onChange={() => setEnvio("express")}
                    className="accent-[#ff8eaa] mr-1"
                  />
                  GLS Express (24h){" "}
                  <span className="font-bold">(+4.95€)</span>
                </label>
              </span>
            </span>
            <span>
              {envioPrecio === 0
                ? "Gratis"
                : envioPrecio.toFixed(2) + "€"}
            </span>
          </div>
          <div className="flex justify-between font-bold text-xl text-white mt-3">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <div className="text-xs text-white/60 text-right">
            Incluye {IVA}€ IVA (21%)
          </div>
        </div>
      </div>
    </div>
  </div>
)}


          </div>

          {/* BOTONES DE NAVEGACIÓN CON FLECHAS, SIEMPRE ABAJO DERECHA */}
            <div className="w-full flex justify-end gap-4 mt-6 md:mt-8 px-2 md:px-8 z-30">
            {step > 0 && (
                <button
                type="button"
                onClick={handlePrev}
                className="flex items-center justify-center rounded-full w-12 h-12 bg-white/20 hover:bg-[#67b2c1]/80 text-white shadow hover:scale-105 transition-all"
                aria-label="Atrás"
                >
                <ArrowLeft size={28} />
                </button>
            )}
            {step < 2 ? (
                <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center rounded-full w-12 h-12 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white shadow hover:scale-105 transition-all"
                aria-label="Siguiente"
                >
                <ArrowRight size={28} />
                </button>
            ) : (
                <button
                type="submit"
                form="checkoutform" // OJO: pon id al form si usas esto (ver abajo)
                className="flex items-center justify-center rounded-full w-12 h-12 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white shadow hover:scale-105 transition-all"
                aria-label="Realizar Pedido"
                >
                <ArrowRight size={28} />
                </button>
            )}
            </div>
        </motion.form>
      </AnimatePresence>
    </main>
  );
}

// STEPPER COMPONENT
function Stepper({ step, goToStep }: { step: number; goToStep: (i: number) => void }) {
  const stepSpacing = 150;

  return (
    <div className="relative z-20 flex items-center justify-center gap-0 select-none h-32">
      {/* Cabra animada delante del paso activo */}
      <motion.div
        animate={{ x: step * stepSpacing }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="absolute top-2 left-4 z-20"
      >
        <Image
          src="/images/Gemini_Generated_Image_axnreraxnreraxnr-removebg-preview.png"
          alt="Cabrón elegante"
          width={90}
          height={90}
          className="rounded-full shadow-xl scale-x-[-1]"
        />
      </motion.div>

      {/* Círculos con números */}
      {steps.map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="relative z-10">
            <button
              className={`
                w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center font-bold text-sm
                ${step === i
                  ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] border-white text-black scale-110"
                  : step > i
                  ? "bg-[#67b2c1] border-[#67b2c1] text-white"
                  : "bg-black/60 border-white/40 text-white/80"}
              `}
              onClick={() => goToStep(i)}
              type="button"
              aria-label={`Paso ${i + 1}`}
            >
              {i + 1}
            </button>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-25 h-1 mx-1 rounded-full transition-all
                ${step > i
                  ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
                  : "bg-white/30"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}


// INPUT CON FLOATING LABEL, SIEMPRE ALINEADA CON LA LÍNEA
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
          rounded-none text-white placeholder-transparent py-2 px-0
          outline-none transition-all text-base
        `}
        placeholder={label}
        required={label.includes("*")}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-0 pointer-events-none text-white/80 transition-all duration-200 bg-transparent
          ${focused || value ? "text-xs -top-3 px-0 bg-black/60" : "text-base top-2"}
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
