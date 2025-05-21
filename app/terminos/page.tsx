"use client";
import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans px-6 py-10 pt-28">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#67b2c1]">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Última actualización: mayo 2025
        </p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-800">
          <p>
            Bienvenido a <strong>2CabrasConTraje</strong>. Al registrarte o utilizar nuestra
            plataforma, aceptas los siguientes términos y condiciones. Si no estás de acuerdo, por
            favor no utilices nuestros servicios.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">1. Uso de la plataforma</h2>
          <p>
            La plataforma está diseñada para usuarios mayores de edad. Te comprometes a utilizarla
            de forma responsable y a no compartir información falsa o fraudulenta.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">2. Datos personales</h2>
          <p>
            Al registrarte, recopilamos datos personales como tu nombre, apellidos, correo
            electrónico y contraseña. Estos datos se almacenan de forma segura y solo se usan para
            ofrecerte nuestros servicios. Consulta nuestra{" "}
            <Link
              href="/privacidad"
              className="text-[#67b2c1] underline hover:text-[#ff8eaa]"
              target="_blank"
            >
              Política de Privacidad
            </Link>{" "}
            para más detalles.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">3. Propiedad intelectual</h2>
          <p>
            Todo el contenido (textos, imágenes, videos) pertenece a 2CabrasConTraje o a sus
            colaboradores. No puedes copiar, distribuir o modificar ningún contenido sin permiso.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">4. Modificaciones</h2>
          <p>
            Podemos actualizar estos términos ocasionalmente. Te notificaremos si hay cambios
            importantes. El uso continuado de la plataforma implica la aceptación de las
            modificaciones.
          </p>

          <h2 className="text-lg font-semibold text-[#67b2c1]">5. Contacto</h2>
          <p>
            Para cualquier duda sobre estos términos, puedes escribirnos a{" "}
            <a
              href="mailto:soporte@2cabrascontraje.com"
              className="underline text-[#67b2c1] hover:text-[#ff8eaa]"
            >
              soporte@2cabrascontraje.com
            </a>
            .
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-5 py-2 rounded-xl border border-[#67b2c1] text-[#67b2c1] hover:bg-[#67b2c1] hover:text-white transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
