"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegistroForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [temporarilyReveal, setTemporarilyReveal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [email, setEmail] = useState("");

  const revealTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();

useEffect(() => {
  const verifiedStatus = searchParams.get("verified");
  const unsubscribed = searchParams.get("unsubscribed");

  if (verifiedStatus === "1") {
    alert("✅ Tu cuenta ha sido confirmada con éxito. Ya puedes iniciar sesión.");
  } else if (verifiedStatus === "0") {
    alert("❌ El enlace de verificación no es válido o ha expirado.");
  }

  if (unsubscribed === "1") {
    alert("🫡 Tu cuenta ha sido desactivada. Lamentamos verte partir.");
  } else if (unsubscribed === "0") {
    alert("❌ Hubo un error al procesar la baja.");
  }
}, [searchParams]);



  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAcceptTerms(false);
    setPassword("");
    setConfirmPassword("");
  };

  const validatePassword = (value: string) => [
    { test: value.length >= 6, label: "Debe tener al menos 6 caracteres." },
    { test: /[A-Z]/.test(value), label: "Debe contener al menos una mayúscula." },
    { test: /[a-z]/.test(value), label: "Debe contener al menos una minúscula." },
    { test: /[0-9]/.test(value), label: "Debe contener al menos un número." },
    { test: /[^A-Za-z0-9]/.test(value), label: "Debe incluir un carácter especial." },
  ];

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setTemporarilyReveal(true);
    if (revealTimeout.current) clearTimeout(revealTimeout.current);
    revealTimeout.current = setTimeout(() => setTemporarilyReveal(false), 500);
  };

  const passwordInputType = !showPassword && !temporarilyReveal ? "password" : "text";
  const confirmInputType = !showConfirmPassword ? "password" : "text";

  const passwordChecks = validatePassword(password);
  const isPasswordValid = passwordChecks.every(rule => rule.test);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) return;

    if (!isLogin) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            firstName: nombre,
            lastName1: apellido1,
            lastName2: apellido2,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.error?.includes("already exists")) {
            alert("Este correo ya está registrado. Puedes iniciar sesión.");
          } else {
            alert("❌ Error al registrar usuario: " + (data.error || "Error desconocido."));
          }
          return;
        }

        alert("🎉 Usuario registrado correctamente. Revisa tu correo para validar tu cuenta.");
      } catch (err) {
        alert("❌ Error de conexión o del servidor.");
        console.error(err);
      }
    } else {
      alert("Has iniciado sesión, disfruta de tu días como cabra con traje.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-4 py-10">
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mt-16 sm:mt-24">
        <div className="group relative p-[2px] rounded-3xl overflow-hidden transition-all duration-[2000ms]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms] rounded-3xl pointer-events-none" />
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 w-[90vw] max-w-md z-10">
            <div className="flex justify-center mb-6">
              <Image src="/images/Logo_pasteles_1.png" alt="2Cabras Logo" width={65} height={65} className="object-contain" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-black">
              {isLogin ? "Inicia sesión" : "Únete al mundo de las cabras"}
            </h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              {isLogin ? "Entra y sigue rompiendo la norma." : "Regístrate y ponle los cuernos al sistema."}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input type="text" required placeholder="Cabra"
                        value={nombre} onChange={(e) => setNombre(e.target.value)}
                        className="mt-1 w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">1º Apellido</label>
                      <input type="text" required placeholder="Con"
                        value={apellido1} onChange={(e) => setApellido1(e.target.value)}
                        className="mt-1 w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">2º Apellido</label>
                    <input type="text" required placeholder="Traje"
                      value={apellido2} onChange={(e) => setApellido2(e.target.value)}
                      className="mt-1 w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input type="email" required placeholder="tu@correo.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition cursor-pointer"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type={passwordInputType} required minLength={6}
                  value={password} onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full text-black px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8eaa] transition cursor-pointer"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[38px] right-3 text-gray-600 hover:text-black cursor-pointer" tabIndex={-1}
                >
                  {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                </button>

                {isLogin && (
                  <div className="mt-4 text-center">
                    <a href="/recuperar" className="text-sm text-[#67b2c1] hover:text-[#ff8eaa] underline transition cursor-pointer">
                      ¿Has olvidado tu contraseña?
                    </a>
                  </div>
                )}

                {!isLogin && (
                  <ul className="text-sm mt-1 list-disc list-inside space-y-1 ">
                    {passwordChecks.map((rule, i) => (
                      <li key={i} className={rule.test ? "text-green-600" : "text-red-500"}>
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Repetir contraseña</label>
                    <input type={confirmInputType} required minLength={6}
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`mt-1 w-full text-black px-4 py-2 pr-10 bg-gray-100 border ${
                        confirmPassword.length === 0
                          ? "border-gray-300"
                          : passwordsMatch
                          ? "border-green-500"
                          : "border-red-500"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        passwordsMatch ? "focus:ring-green-500" : "focus:ring-[#f6bd6b]"
                      } transition`}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-[38px] right-3 text-gray-600 hover:text-black" tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                    </button>

                    {confirmPassword.length > 0 && (
                      <p className={`text-sm mt-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
                        {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input id="terms" type="checkbox" checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      className="h-4 w-4 text-[#67b2c1] focus:ring-[#67b2c1] border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      Acepto los{" "}
                      <a href="/terminos" target="_blank" rel="noopener noreferrer"
                        className="underline text-[#67b2c1] hover:text-[#ff8eaa] transition">
                        Términos y Condiciones
                      </a>
                    </label>
                  </div>
                </>
              )}

              <button type="submit"
                className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white font-semibold rounded-xl shadow-md transition-all duration-400 ease-in-out hover:bg-white hover:text-black hover:border hover:border-black disabled:opacity-50 cursor-pointer"
                disabled={
                  !isLogin &&
                  (!isPasswordValid || !passwordsMatch || !acceptTerms || !nombre || !apellido1 || !email)
                }
              >
                {isLogin ? "Entrar al rebaño" : "Unirme a 2CabrasConTraje"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "¿No formas parte aún?" : "¿Ya tienes cuenta?"}
                <button type="button" onClick={toggleMode}
                  className="ml-2 text-[#67b2c1] hover:text-[#ff8eaa] font-semibold transition cursor-pointer"
                >
                  {isLogin ? "Regístrate" : "Inicia sesión"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
