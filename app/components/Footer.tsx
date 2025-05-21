// components/Footer.tsx
import { Facebook, Instagram, Twitter } from "lucide-react";
import CookiesModal from "./CookiesModal";

export default function Footer() {
  return (
    <footer className="bg-white py-6 text-center border-t">
      {/* Redes sociales con iconos Lucide */}
      <div className="flex justify-center gap-6 mb-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5 text-gray-600 hover:text-[#1877F2] transition" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 text-gray-600 hover:text-[#E4405F] transition" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5 text-gray-600 hover:text-[#1DA1F2] transition" />
        </a>
      </div>

      {/* Enlaces legales */}
      <div className="flex justify-center flex-wrap gap-4 mb-2 text-xs text-gray-500">
        <a
          href="/terminos"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#67b2c1] underline transition"
        >
          Términos y Condiciones
        </a>
        <a
          href="/privacidad"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#67b2c1] underline transition"
        >
          Política de Privacidad
        </a>
        <CookiesModal />
        <a
          href="#"
          className="hover:text-[#67b2c1] underline transition"
        >
          Contacto Legal
        </a>
      </div>

      <p className="text-xs text-gray-500">
        © 2025 2CabrasConTraje. Todos los derechos reservados.
      </p>
    </footer>
  );
}
