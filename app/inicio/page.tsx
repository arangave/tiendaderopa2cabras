// ...importaciones

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";

import { ShoppingBagIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";






// Definimos la estructura del producto
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Inicio() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [zoom, setZoom] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState<number>(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sweaterIndex, setSweaterIndex] = useState(0);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [likes, setLikes] = useState<Product[]>([]);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Empieza en modo oscuro
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  
  


  useEffect(() => {
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const itemsPerPage = windowWidth < 768 ? 1 : 3;


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(likes));
  }, [likes]);
  
  


  // Al cargar, leer del localStorage si hay preferencia guardada
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme");
      if (savedMode === "dark") setIsDarkMode(true);
      else if (savedMode === "light") setIsDarkMode(false);
    }
  }, []);

  // Cambiar clase al <html> según el modo y guardar en localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  



  const products: Product[] = [
    { id: 101, name: "Camiseta Premium", description: "Camiseta de algodón orgánico con estampado exclusivo.", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 102, name: "Sudadera de Lujo", description: "Sudadera cómoda y elegante para cualquier ocasión.", price: "49,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 103, name: "Pantalones Clásicos", description: "Pantalones de diseño moderno y versátil.", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 104, name: "Gorra Exclusiva", description: "Gorra de alta calidad con diseño único.", price: "19,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 }
  ];

  const sweaters = [
    { id: 201, name: "Sudadera Urbana", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 202, name: "Sudadera Clásica", price: "35,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 203, name: "Sudadera Casual", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 204, name: "Sudadera Vintage", price: "45,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 205, name: "Sudadera Premium", price: "59,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 206, name: "Sudadera Sport", price: "32,99€", image: "/images/Backside T-Shirt Mockup.png" }
  ];
  const tshirts = [
    { id: 301, name: "Camiseta Urbana", description: "Camiseta de la colección exclusiva", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 302, name: "Camiseta Casual", description: "Camiseta de la colección exclusiva", price: "24,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 303, name: "Camiseta Oversize", description: "Camiseta de la colección exclusiva", price: "34,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 304, name: "Camiseta Vintage", description: "Camiseta de la colección exclusiva", price: "27,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 305, name: "Camiseta Básica", description: "Camiseta de la colección exclusiva", price: "19,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 306, name: "Camiseta Premium", description: "Camiseta de la colección exclusiva", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 }
  ];


  const [tshirtIndex, setTshirtIndex] = useState(0);


  const isProductLiked = (id: number) => likes.some((p) => p.id === id);

  const toggleLike = (product: Product) => {
    setLikes((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };


  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => {
    setSelectedProduct(null);
    setZoom(false);
  };

  const addToCart = (product: Product) => {
    if (!selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }
  
    const productWithQuantity = { ...product, quantity, size: selectedSize };
    const updatedCart = [...cart, productWithQuantity];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    showToast("Producto añadido a la cesta 🛒");
  };
  



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Usamos base 10
    setQuantity(newQuantity);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };
  

  const sizes = [
    "XXS", "XS", "S", "M", "L", "XL", "XXL"
  ];

  return (
    
      <>
        {toastMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-[9999] transition-all duration-300">
            {toastMessage}
          </div>
        )}

  
      <main>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67b2c1" />
            <stop offset="50%" stopColor="#ff8eaa" />
            <stop offset="100%" stopColor="#f6bd6b" />
          </linearGradient>
        </defs>
      </svg>

      {/* HEADER */}

      <header className="header flex justify-between items-center p-4 relative z-50">
  {/* Logo */}
  <a href="/inicio">
    <Image
      src="/images/Logo_pasteles_1.png"
      alt="Logo"
      width={50}
      height={50}
      className="logo"
      priority
    />
  </a>

  {/* Botón hamburguesa móvil */}
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
          menuOpen ? "bg-black opacity-0" : "bg-black"
        } rounded transition-opacity duration-300 ease-in-out absolute top-3 left-0`}
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

  {/* Menú de navegación */}
  <ul
    className={`nav-links flex-col items-center justify-center text-center
      absolute top-20 right-0 bg-black/90 text-white p-6 rounded-lg shadow-md gap-6 z-40 w-[100vw] transition-all duration-300
      ${menuOpen ? "flex mobile-menu" : "hidden"}
      md:static md:flex md:flex-row md:bg-transparent md:text-black md:shadow-none md:p-0 md:gap-6 md:w-auto`}
  >
    <li>
      <a href="/inicio" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-[#67b2c1]">Inicio</a>
    </li>
    <li>
      <a href="/2cabras" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-[#67b2c1]">2Cabras</a>
    </li>
    <li>
      <a href="productos" onClick={() => setMenuOpen(false)} className="font-semibold hover:text-[#67b2c1]">Productos</a>
    </li>
    <li>
      <a href="/registro" onClick={() => setMenuOpen(false)} className="flex items-center justify-center">
        <UserIcon className="w-6 h-6 text-white md:text-black" />
      </a>
    </li>
    <li className="relative text-center">
      <a href="/likes" onClick={() => setMenuOpen(false)} className="flex items-center justify-center">
        <HeartIcon className="w-6 h-6 text-white md:text-black" />
        {likes.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-white text-black text-xs font-bold px-2 py-[1px] rounded-full shadow-md border border-gray-300">
            {likes.length}
          </span>
        )}
      </a>
    </li>
    <li className="relative text-center no-underline-link">
      <a
        href="/carrito"
        onClick={() => setMenuOpen(false)}
        className="flex items-center justify-center group transition-all duration-300"
      >
        <ShoppingBagIcon className="w-6 h-6 text-white md:text-black group-hover:text-[#67b2c1]" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-white text-black text-xs font-bold px-2 py-[1px] rounded-full shadow-md border border-gray-300">
            {cart.length}
          </span>
        )}
      </a>
    </li>
  </ul>
</header>

{/* HERO SECTION */}
<section className="hero py-4 sm:py-8">
  {/* BOTON DE NOCHE Y DIA */}
  <div className="absolute top-28 sm:top-36 right-4 z-50">
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/30 dark:border-black/30 flex items-center justify-center transition-all duration-500 hover:scale-110 bg-white dark:bg-white shadow-md"
      aria-label="Cambiar modo"
    >
      <span
        className={`transition-transform duration-500 ease-in-out transform ${
          isDarkMode ? "rotate-180" : "rotate-0"
        }`}
      >
        {isDarkMode ? (
          // 🌞 Modo claro → mostrar sol
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-6 sm:h-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12H2.5M19.071 4.929l-.707.707M5.636 18.364l-.707.707M19.071 19.071l-.707-.707M5.636 5.636l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          // 🌙 Modo oscuro → mostrar luna
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-6 sm:h-6 text-black transition-transform duration-500 ease-in-out"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.09 9.79z" />
          </svg>
        )}
      </span>
    </button>
  </div>

  <div className="hero-content px-2 sm:px-8 max-w-7xl mx-auto">
    <div className="hero-text text-center sm:text-left">
      <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-3">Descubre el estilo de 2CabrasConTraje</h2>
      <p className="text-xs sm:text-sm mb-1 sm:mb-2">Moda exclusiva para quienes buscan algo único.</p>
      <p className="highlight text-xs sm:text-sm mb-3">&quot;Rompe con la norma o ponle los cuernos&quot;</p>
      <a
        href="#"
        className="btn px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm shadow-md shadow-black/40 hover:shadow-lg hover:shadow-black/20 transition duration-300"
      >
        Ver Colección
      </a>
    </div>
    <div className="hero-video mt-2 sm:mt-4">
      <video autoPlay muted loop playsInline className="w-full h-auto rounded-lg shadow-md">
        <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5
      </video>
    </div>
  </div>
</section>



{/* DESTACADOS */}
<section className="products mt-0">
  <div className="flex flex-col items-center justify-center my-6">
    <h2 className="text-center text-3xl font-bold text-black mb-2">Destacados</h2>
    <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4">
    {/* Flecha izquierda */}
    {products.length > itemsPerPage && (
      <button
        onClick={() =>
          setFeaturedIndex((prev) =>
            prev === 0 ? products.length - itemsPerPage : prev - 1
          )
        }
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
      >
        ‹
      </button>
    )}

    {/* Carrusel */}
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${(products.length * 100) / itemsPerPage}%`,
          transform: `translateX(-${featuredIndex * (100 / products.length)}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-center px-3 flex-shrink-0 mb-6"
            style={{ width: `${100 / products.length}%` }}
          >
            <div className="product-card group bg-white p-4 rounded-lg shadow-md relative max-w-xs w-full">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="cursor-pointer rounded-md"
                onClick={() => openModal(product)}
              />
              <h3 className="text-lg font-semibold mt-2 text-black">{product.name}</h3>
              <p className="text-md text-black">{product.price}</p>

              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  className="btn shadow-md shadow-black/40 hover:shadow-lg transition duration-300"
                  onClick={() => openModal(product)}
                >
                  Ver Producto
                </button>
              </div>

              <button
                onClick={() => toggleLike(product)}
                className="absolute bottom-4 right-4 p-2 hover:scale-110 transition"
              >
                {isProductLiked(product.id) ? (
                  <HeartIconSolid
                    className="w-6 h-6"
                    style={{ fill: "url(#grad)", stroke: "none" }}
                  />
                ) : (
                  <HeartIcon className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Flecha derecha */}
    {products.length > itemsPerPage && (
      <button
        onClick={() =>
          setFeaturedIndex((prev) =>
            prev >= products.length - itemsPerPage ? 0 : prev + 1
          )
        }
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
      >
        ›
      </button>
    )}
  </div>
</section>



      {/* CARRUSEL DE SUDADERAS */}
      <section className="products mt-0">
  <div className="flex flex-col items-center justify-center my-6">
    <h2 className="text-center text-3xl font-bold text-black mb-2">Sudaderas</h2>
    <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4">
    {sweaters.length > itemsPerPage && (
      <button
        onClick={() =>
          setSweaterIndex((prev) =>
            prev === 0 ? sweaters.length - itemsPerPage : prev - 1
          )
        }
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        ‹
      </button>
    )}

    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${(sweaters.length * 100) / itemsPerPage}%`,
          transform: `translateX(-${sweaterIndex * (100 / sweaters.length)}%)`,
        }}
      >
        {sweaters.map((item) => (
          <div
            key={item.id}
            className="flex justify-center px-3 flex-shrink-0 mb-6"
            style={{ width: `${100 / sweaters.length}%` }}
          >
            <div className="product-card group bg-white p-4 rounded-lg shadow-md relative max-w-xs w-full">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="cursor-pointer rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-black">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>

              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  className="btn shadow-md shadow-black/40 hover:shadow-lg transition duration-300"
                  onClick={() =>
                    openModal({
                      ...item,
                      description: "Sudadera exclusiva",
                      quantity: 1,
                    })
                  }
                >
                  Ver Producto
                </button>
              </div>

              <button
                onClick={() =>
                  toggleLike({
                    ...item,
                    description: "Sudadera exclusiva",
                    quantity: 1,
                  })
                }
                className="absolute bottom-4 right-4 p-2 hover:scale-110 transition"
              >
                {isProductLiked(item.id) ? (
                  <HeartIconSolid className="w-6 h-6" style={{ fill: "url(#grad)" }} />
                ) : (
                  <HeartIcon className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {sweaters.length > itemsPerPage && (
      <button
        onClick={() =>
          setSweaterIndex((prev) =>
            prev >= sweaters.length - itemsPerPage ? 0 : prev + 1
          )
        }
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        ›
      </button>
    )}
  </div>
</section>




{/* PRODUCTOS CAMISETAS */}
<section className="products mt-0">
  <div className="flex flex-col items-center justify-center my-6">
    <h2 className="text-center text-3xl font-bold text-black mb-2">Camisetas</h2>
    <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4">
    {tshirts.length > itemsPerPage && (
      <button
        onClick={() =>
          setTshirtIndex((prev) =>
            prev === 0 ? tshirts.length - itemsPerPage : prev - 1
          )
        }
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        ‹
      </button>
    )}

    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${(tshirts.length * 100) / itemsPerPage}%`,
          transform: `translateX(-${tshirtIndex * (100 / tshirts.length)}%)`,
        }}
      >
        {tshirts.map((item) => (
          <div
            key={item.id}
            className="flex justify-center px-3 flex-shrink-0 mb-6"
            style={{ width: `${100 / tshirts.length}%` }}
          >
            <div className="product-card group bg-white p-4 rounded-lg shadow-md relative max-w-xs w-full">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="cursor-pointer rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-black">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>

              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  className="btn shadow-md shadow-black/40 hover:shadow-lg transition duration-300"
                  onClick={() =>
                    openModal({
                      ...item,
                      description: "Camiseta exclusiva",
                      quantity: 1,
                    })
                  }
                >
                  Ver Producto
                </button>
              </div>

              <button
                onClick={() => toggleLike(item)}
                className="absolute bottom-4 right-4 p-2 hover:scale-110 transition"
              >
                {isProductLiked(item.id) ? (
                  <HeartIconSolid className="w-6 h-6" style={{ fill: "url(#grad)" }} />
                ) : (
                  <HeartIcon className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {tshirts.length > itemsPerPage && (
      <button
        onClick={() =>
          setTshirtIndex((prev) =>
            prev >= tshirts.length - itemsPerPage ? 0 : prev + 1
          )
        }
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        ›
      </button>
    )}
  </div>
</section>




<section className="bg-white py-12 px-4 text-center">
  <h2 className="text-3xl font-bold mb-4 text-black">
    Únete al mundo de <span className="bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] bg-clip-text text-transparent">2CabrasConTraje</span>
  </h2>
  <p className="text-gray-700 max-w-xl mx-auto mb-6">
    Recibe ideas, filosofía de marca y alguna que otra forma de<br /> &quot;poner los cuernos&quot;... al sistema. ✨
  </p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert("Gracias por unirte al mundo 2CabrasConTraje 🐐");
    }}
    className="flex flex-col items-center justify-center gap-4 max-w-md mx-auto"
  >
    <input
      type="email"
      placeholder="Tu correo electrónico"
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
    />
    <button
      type="submit"
      className="btn shadow-md shadow-black/40 hover:shadow-lg hover:shadow-black/20 transition duration-300"
    >
      Unirme
    </button>
  </form>
</section>



      {/* FOOTER */}
      <footer>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
        <p>© 2025 2CabrasConTraje. Todos los derechos reservados.</p>
      </footer>

      {/* MODAL - Detalles del producto */}
      {selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center" onClick={handleOverlayClick}>
          
          {/* Contenedor del modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-10 flex">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center z-50 group hover:scale-110 transition"
              aria-label="Cerrar modal"
            >
              <div className="relative w-5 h-5">
                <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute rotate-45 top-2 left-0" />
                <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute -rotate-45 top-2 left-0" />
              </div>
            </button>


            {/* Modal Content */}
            <div className="flex items-center space-x-6">
              {/* Imagen */}
              <div className="relative overflow-hidden group">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className={`rounded-md transition-transform duration-300 cursor-crosshair ${zoom ? "scale-[2]" : "scale-100"}`}
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={handleMouseMove}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>

              {/* Texto de producto */}
              <div className="flex flex-col space-y-4 w-1/2">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-gray-600">{selectedProduct.description}</p>
                <p className="text-xl font-bold">{selectedProduct.price}</p>

                {/* Campo de cantidad */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-lg">Cantidad:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 p-2 border rounded-md text-center"
                  />
                </div>
                {/* Selector de talla con botones */}
                <div className="flex flex-col space-y-2">
                  <label className="text-lg">Talla:</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md text-sm font-medium transition 
          ${selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>



                {/* MODAL - Guía de tallas */}
                {showSizeGuideModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-60">
                    <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                      <button
                        onClick={() => setShowSizeGuideModal(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center z-50 group hover:scale-110 transition"
                        aria-label="Cerrar guía de tallas"
                      >
                        <div className="relative w-5 h-5">
                          <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute rotate-45 top-2 left-0" />
                          <span className="block w-full h-[2px] bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded absolute -rotate-45 top-2 left-0" />
                        </div>
                      </button>

                      <h2 className="text-xl font-bold mb-4">Guía de Tallas</h2>
                      <table className="w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 border">Talla</th>
                            <th className="p-2 border">UE</th>
                            <th className="p-2 border">Pecho</th>
                            <th className="p-2 border">Cintura</th>
                            <th className="p-2 border">Cadera</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["XXS", "32", "74-77 cm", "61-63 cm", "83-85 cm"],
                            ["XS", "34", "78-81 cm", "62-64 cm", "86-89 cm"],
                            ["S", "36", "82-85 cm", "65-67 cm", "93-96 cm"],
                            ["M", "38", "86-89 cm", "68-71 cm", "97-100 cm"],
                            ["L", "40", "90-93 cm", "72-75 cm", "101-104 cm"],
                            ["XL", "42", "94-97 cm", "76-79 cm", "105-107 cm"],
                            ["XXL/2XL", "44", "98-101 cm", "80-84 cm", "108-112 cm"],

                          ].map(([size, eu, chest, waist, hips]) => (
                            <tr key={size}>
                              <td className="p-2 border">{size}</td>
                              <td className="p-2 border">{eu}</td>
                              <td className="p-2 border">{chest}</td>
                              <td className="p-2 border">{waist}</td>
                              <td className="p-2 border">{hips}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Botón para mostrar la guía de tallas */}
                <button
                  onClick={() => setShowSizeGuideModal(true)}
                  className="relative text-black text-sm font-semibold transition duration-300 hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#67b2c1] after:via-[#ff8eaa] after:to-[#f6bd6b] after:rounded after:transition-all"
                >
                  Guía de Tallas
                </button>


                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end sm:items-center sm:gap-4 sm:pr-5">
                  <button
                    onClick={() => addToCart(selectedProduct!)}
                    className="px-6 py-2 bg-black text-white font-semibold rounded-md transition-all duration-300
      hover:scale-95 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b] hover:text-white"
                  >
                    Añadir a la cesta
                  </button>

                  <button
                    onClick={() => toggleLike(selectedProduct!)}
                    aria-label="Me gusta"
                    className="p-2 hover:scale-110 transition"
                  >
                    {isProductLiked(selectedProduct!.id) ? (
                      <HeartIconSolid
                        className="w-6 h-6 transition-all duration-300"
                        style={{
                          fill: "url(#grad)",
                          stroke: "none",
                        }}
                      />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-black transition-all duration-300" />
                    )}
                  </button>
                </div>



              </div>
            </div>
          </div>
        </div>
      )}
      
    </main>
  </>
  );
}
