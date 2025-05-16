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
            className={`block h-[3px] w-5 ${menuOpen ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" : "bg-black"
              } rounded transition-transform duration-300 ease-in-out absolute ${menuOpen ? "rotate-45 top-3 left-0" : "top-1"
              }`}
          />
          <span
            className={`block h-[3px] w-5 ${menuOpen ? "opacity-0" : "opacity-100"
              } bg-black rounded transition-opacity duration-300 absolute top-3 left-0`}
          />
          <span
            className={`block h-[3px] w-5 ${menuOpen ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" : "bg-black"
              } rounded transition-transform duration-300 ease-in-out absolute ${menuOpen ? "-rotate-45 top-3 left-0" : "top-5"
              }`}
          />
        </div>
      </div>

      {/* Menú navegación */}
      <ul
        className={`nav-links flex-col items-center justify-center text-center
        absolute top-20 right-0 bg-black/90 text-white p-6 rounded-lg shadow-md gap-6 z-40 w-[100vw] transition-all duration-300
        ${menuOpen ? "flex mobile-menu" : "hidden"}
        md:static md:flex md:flex-row md:bg-transparent md:text-black md:shadow-none md:p-0 md:gap-6 md:w-auto`}
      >
        <li><Link href="/inicio">Inicio</Link></li>
        <li><Link href="/2cabras">2Cabras</Link></li>
        <li><Link href="/productos">Productos</Link></li>
        <li>
          <Link href="/registro">
            <UserIcon className="w-6 h-6 text-white md:text-black" />
          </Link>
        </li>
        <li className="relative">
          <Link href="/likes" className="flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-white md:text-black" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-white text-black text-xs font-bold px-2 py-[1px] rounded-full border">
                {favoritesCount}
              </span>
            )}
          </Link>
        </li>
        <li className="relative">
        <Link
            href="/carrito"
            className=" flex items-center justify-center no-underline group"
            >
            <ShoppingBagIcon className="w-6 h-6 text-white md:text-black " />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-black text-[10px] font-semibold px-1.5 py-[1px] rounded-full border leading-none">
                {cartCount}
                </span>
            )}
        </Link>
        </li>
      </ul>
    </header>
  );
}
