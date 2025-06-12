"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBagIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  cartCount?: number;
  favoritesCount?: number;
}

export default function Header({ cartCount = 0, favoritesCount = 0 }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Evita scroll cuando el menú está abierto (en móvil)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra menú al hacer clic fuera
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    if (menuOpen) {
      window.addEventListener("click", closeMenu);
    }
    return () => window.removeEventListener("click", closeMenu);
  }, [menuOpen]);

  return (
    <header className="header flex justify-between items-center p-4 relative z-50">
      <Link href="/inicio">
        <Image
          src="/images/Logo_pasteles_1.png"
          alt="Logo"
          width={50}
          height={50}
          className="logo"
          priority
        />
      </Link>

      {/* Botón hamburguesa */}
      <div
        className="md:hidden flex flex-col justify-center items-end gap-1 w-10 h-10 cursor-pointer z-50"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
      >
        <div className="relative w-6 h-6">
          <span
            className={`block h-[3px] w-5 ${
              menuOpen
                ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
                : "bg-black"
            } rounded transition-transform duration-300 ease-in-out absolute ${
              menuOpen ? "rotate-45 top-3 left-0" : "top-1"
            }`}
          />
          <span
            className={`block h-[3px] w-5 ${
              menuOpen ? "opacity-0" : "opacity-100"
            } bg-black rounded transition-opacity duration-300 absolute top-3 left-0`}
          />
          <span
            className={`block h-[3px] w-5 ${
              menuOpen
                ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
                : "bg-black"
            } rounded transition-transform duration-300 ease-in-out absolute ${
              menuOpen ? "-rotate-45 top-3 left-0" : "top-5"
            }`}
          />
        </div>
      </div>

      {/* Menú navegación móvil */}
      <ul
        className={`
          nav-links
          flex-col items-center justify-center text-center
          fixed left-0 top-0 w-screen h-screen
          bg-black/90 text-white z-40
          transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-y-0 flex" : "-translate-y-full pointer-events-none"}
          md:static md:flex md:flex-row md:bg-transparent md:text-black md:shadow-none md:p-0 md:gap-6 md:w-auto md:h-auto md:translate-y-0 md:pointer-events-auto
        `}
        style={{
          padding: menuOpen ? "90px 24px 24px 24px" : "0px", // espacio arriba (header)
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <li className="mb-6 md:mb-0">
          <Link
            href="/inicio"
            onClick={() => setMenuOpen(false)}
            className="text-lg md:text-base font-semibold mb-2 md:mb-0 block md:inline"
          >
            Inicio
          </Link>
        </li>
        <li className="mb-6 md:mb-0">
          <Link
            href="/2cabras"
            onClick={() => setMenuOpen(false)}
            className="text-lg md:text-base font-semibold mb-2 md:mb-0 block md:inline"
          >
            2Cabras
          </Link>
        </li>
        <li className="mb-6 md:mb-0">
          <Link
            href="/productos"
            onClick={() => setMenuOpen(false)}
            className="text-lg md:text-base font-semibold mb-2 md:mb-0 block md:inline"
          >
            Productos
          </Link>
        </li>
        <li className="mb-6 md:mb-0">
          <Link
            href="/registro"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center"
          >
            <UserIcon className="w-7 h-7 md:w-6 md:h-6 text-white md:text-black" />
          </Link>
        </li>
        <li className="mb-6 md:mb-0 relative">
          <Link
            href="/likes"
            className="flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <HeartIcon className="w-7 h-7 md:w-6 md:h-6 text-white md:text-black" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-white text-black text-base md:text-xs font-bold px-3 py-1 md:px-2 md:py-[1px] rounded-full border">
                {favoritesCount}
              </span>
            )}
          </Link>
        </li>
        <li className="mb-6 md:mb-0 relative">
          <Link
            href="/carrito"
            className="flex items-center justify-center no-underline group"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingBagIcon className="w-7 h-7 md:w-6 md:h-6 text-white md:text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-white text-black text-base md:text-[10px] font-semibold px-3 md:px-1.5 py-1 md:py-[1px] rounded-full border leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </header>
  );
}
