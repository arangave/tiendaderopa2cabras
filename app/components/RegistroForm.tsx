"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegistroForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [temporarilyReveal, setTemporarilyReveal] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const revealTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verified = searchParams.get("verified");
    const unsubscribed = searchParams.get("unsubscribed");

    if (verified === "1") {
      setStatus({ type: "success", message: "✅ Tu cuenta ha sido confirmada. ¡Inicia sesión!" });
    } else if (verified === "0") {
      setStatus({ type: "error", message: "❌ Enlace inválido o expirado." });
    }

    if (unsubscribed === "1") {
      setStatus({ type: "success", message: "🫡 Tu cuenta ha sido desactivada." });
    } else if (unsubscribed === "0") {
      setStatus({ type: "error", message: "❌ Error al procesar la baja." });
    }
  }, [searchParams]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAcceptTerms(false);
    setPassword("");
    setConfirmPassword("");
    setStatus(null);
  };

  const validatePassword = (value: string) => [
    { test: value.length >= 6, label: "Debe tener al menos 6 caracteres." },
    { test: /[A-Z]/.test(value), label: "Debe tener una mayúscula." },
    { test: /[a-z]/.test(value), label: "Debe tener una minúscula." },
    { test: /[0-9]/.test(value), label: "Debe tener un número." },
    { test: /[^A-Za-z0-9]/.test(value), label: "Debe tener un carácter especial." },
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
  const isPasswordValid = passwordChecks.every((rule) => rule.test);
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
            telefono,
            password,
            firstName: nombre,
            lastName1: apellido1,
            lastName2: apellido2,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus({ type: "error", message: data.error || "Error al registrar." });
          return;
        }

        setStatus({
          type: "success",
          message: "🎉 Registro exitoso. Revisa tu correo para confirmar tu cuenta.",
        });
      } catch (err) {
        setStatus({ type: "error", message: "❌ Error del servidor o red." });
      }
    } else {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        setStatus({
          type: "success",
          message: "🚀 Bienvenido al rebaño 🐐. Redirigiendo...",
        });
        setTimeout(() => router.push("/inicio"), 3500);
      } else {
        setStatus({
          type: "error",
          message:
            res?.error === "CredentialsSignin"
              ? "😖 Contraseña incorrecta."
              : "😕 Usuario no encontrado o error desconocido.",
        });
      }
    }
  };

  const isDisabled =
    !isLogin &&
    (!isPasswordValid || !passwordsMatch || !acceptTerms || !nombre || !apellido1 || !email);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4 py-10 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0">
        <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mt-20 w-full max-w-3xl">
        <div className="group relative p-[2px] rounded-3xl overflow-hidden transition-all duration-[2000ms]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms] rounded-3xl pointer-events-none" />
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 w-full z-10">
            <div className="flex justify-center my-2">
              <Image src="/images/Logo_pasteles_1.png" alt="Logo" width={65} height={65} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1 text-black">
              {isLogin ? "Inicia sesión" : "Únete al mundo de las cabras"}
            </h2>
            <p className="text-sm text-center text-gray-600 mb-3">
              {isLogin ? "Entra y sigue rompiendo la norma." : "Regístrate y ponle los cuernos al sistema."}
            </p>

            {status && (
              <div className={`mb-4 px-4 py-2 rounded-lg text-center font-medium ${status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input type="text" placeholder="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="1º Apellido" required value={apellido1} onChange={(e) => setApellido1(e.target.value)} className="text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                    <input type="text" placeholder="2º Apellido" required value={apellido2} onChange={(e) => setApellido2(e.target.value)} className="text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                  </div>

                  <div className="grid sm:grid-cols-5 gap-4">
                    <div className="sm:col-span-2">
                      <input type="tel" placeholder="Teléfono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="sm:col-span-3">
                      <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </>
              )}

              {isLogin && (
                <>
                  <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg" />
                  <div className="relative">
                    <input type={passwordInputType} required minLength={6} placeholder="Contraseña" value={password} onChange={(e) => handlePasswordChange(e.target.value)} className="w-full text-black px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[10px] right-3 text-gray-600 hover:text-black" tabIndex={-1}>
                      {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </>
              )}

              {!isLogin && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type={passwordInputType} required minLength={6} placeholder="Contraseña" value={password} onChange={(e) => handlePasswordChange(e.target.value)} className="w-full text-black px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[10px] right-3 text-gray-600 hover:text-black" tabIndex={-1}>
                      {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                    </button>
                    <button type="button" onClick={() => setShowRequirements(!showRequirements)} className="text-xs text-[#67b2c1] hover:text-[#ff8eaa] underline mt-2 block">
                      {showRequirements ? "Ocultar requisitos" : "Mostrar requisitos"}
                    </button>
                    {showRequirements && (
                      <ul className="text-sm mt-1 list-disc list-inside bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {passwordChecks.map((rule, i) => (
                          <li key={i} className={rule.test ? "text-green-600" : "text-red-500"}>
                            {rule.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative">
                    <input type={confirmInputType} required minLength={6} placeholder="Repetir contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full text-black px-4 py-2 pr-10 bg-gray-100 border ${confirmPassword.length === 0 ? "border-gray-300" : passwordsMatch ? "border-green-500" : "border-red-500"} rounded-lg`} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-[10px] right-3 text-gray-600 hover:text-black" tabIndex={-1}>
                      {showConfirmPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-center mt-4">
                  <input id="terms" type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} className="h-4 w-4 text-[#67b2c1] border-gray-300 rounded" required />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    Acepto los{" "}
                    <a href="/terminos" target="_blank" rel="noopener noreferrer" className="underline text-[#67b2c1] hover:text-[#ff8eaa] transition">
                      Términos y Condiciones
                    </a>
                  </label>
                </div>
              )}

              {isLogin && (
                <div className="mt-2 text-center">
                  <a href="/recuperar" className="text-sm text-[#67b2c1] hover:text-[#ff8eaa] underline">
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isDisabled}
                className={`w-full py-2 px-4 mt-4 font-semibold rounded-xl transition-all duration-300 ease-in-out ${
                  isDisabled
                    ? "bg-gray-300 text-white opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white hover:bg-white hover:text-black hover:border hover:border-black"
                }`}
              >
                {isLogin ? "Entrar al rebaño" : "Unirme a 2CabrasConTraje"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "¿No formas parte aún?" : "¿Ya tienes cuenta?"}
                <button type="button" onClick={toggleMode} className="ml-2 text-[#67b2c1] hover:text-[#ff8eaa] font-semibold">
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
