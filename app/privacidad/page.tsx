"use client";
import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans px-6 py-10 pt-28">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#67b2c1]">
          Política de Privacidad
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Última actualización: mayo 2025
        </p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-800">
          <p>
            En <strong>2CabrasConTraje</strong> valoramos tu privacidad. Esta política explica cómo
            recopilamos, usamos y protegemos tu información personal.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">1. Información que recopilamos</h2>
          <p>
            Al registrarte, solicitamos datos como tu nombre, apellidos, correo electrónico y
            contraseña. También podemos recopilar datos técnicos como IP, tipo de navegador y uso de
            la app para mejorar la experiencia.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">2. Uso de la información</h2>
          <p>Utilizamos tu información para:</p>
          <ul className="list-disc pl-5">
            <li>Gestionar tu cuenta.</li>
            <li>Comunicarnos contigo.</li>
            <li>Mejorar nuestros servicios.</li>
            <li>Cumplir con obligaciones legales.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#67b2c1]">3. Almacenamiento y seguridad</h2>
          <p>
            Almacenamos tus datos de forma segura en servidores protegidos. Nunca compartiremos tus
            datos con terceros sin tu consentimiento, salvo obligación legal.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">4. Cookies y tecnologías</h2>
          <p>
            Usamos cookies para mejorar la navegación y recordar tus preferencias. Puedes
            desactivarlas desde la configuración de tu navegador.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">5. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc pl-5">
            <li>Acceder a tus datos personales.</li>
            <li>Solicitar su modificación o eliminación.</li>
            <li>Retirar tu consentimiento en cualquier momento.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#67b2c1]">6. Contacto</h2>
          <p>
            Si tienes preguntas o deseas ejercer tus derechos, escríbenos a{" "}
            <a
              href="mailto:privacidad@2cabrascontraje.com"
              className="underline text-[#67b2c1] hover:text-[#ff8eaa]"
            >
              privacidad@2cabrascontraje.com
            </a>
            .
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
             href="/inicio"
            className="inline-block px-5 py-2 rounded-xl border border-[#67b2c1] text-[#67b2c1] hover:bg-[#67b2c1] hover:text-white transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
