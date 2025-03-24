// ...importaciones

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./styles/globals.css";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

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
  const [isMobile, setIsMobile] = useState(false); // 👈 Añadido aquí
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);




  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Ejecuta al cargar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const products: Product[] = [
    { id: 1, name: "Camiseta Premium", description: "Camiseta de algodón orgánico con estampado exclusivo.", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 2, name: "Sudadera de Lujo", description: "Sudadera cómoda y elegante para cualquier ocasión.", price: "49,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 3, name: "Pantalones Clásicos", description: "Pantalones de diseño moderno y versátil.", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 4, name: "Gorra Exclusiva", description: "Gorra de alta calidad con diseño único.", price: "19,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 }
  ];

  const sweaters = [
    { id: 1, name: "Sudadera Urbana", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 2, name: "Sudadera Clásica", price: "35,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 3, name: "Sudadera Casual", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 4, name: "Sudadera Vintage", price: "45,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 5, name: "Sudadera Premium", price: "59,99€", image: "/images/Backside T-Shirt Mockup.png" },
    { id: 6, name: "Sudadera Sport", price: "32,99€", image: "/images/Backside T-Shirt Mockup.png" }
  ];

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
    setCart((prevCart) => [...prevCart, productWithQuantity]);
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
  

  const sizes = [
    "XXS", "XS", "S", "M", "L", "XL", "XXL"
  ];



  return (
    <main>
      {/* HEADER */}

      <header
        className="header flex justify-between items-center p-4 relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <Image
          src="/images/Logo_pasteles_1.png"
          alt="Logo"
          width={50}
          height={50}
          className="logo"
          priority
        />

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
              className={`block h-[3px] w-5 ${menuOpen
                  ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
                  : "bg-black"
                } rounded transition-transform duration-300 ease-in-out absolute ${menuOpen ? "rotate-45 top-3 left-0" : "top-1"
                }`}
            />
            <span
              className={`block h-[3px] w-5 ${menuOpen ? "bg-black opacity-0" : "bg-black opacity-100"
                } rounded transition-opacity duration-300 ease-in-out absolute top-3 left-0`}
            />
            <span
              className={`block h-[3px] w-5 ${menuOpen
                  ? "bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]"
                  : "bg-black"
                } rounded transition-transform duration-300 ease-in-out absolute ${menuOpen ? "-rotate-45 top-3 left-0" : "top-5"
                }`}
            />
          </div>
        </div>

        {/* Menú de navegación */}
        <ul
          className={`nav-links flex-col absolute top-28 right-0 bg-black text-black p-6 rounded-lg shadow-md gap-6 z-40 w-[80vw] transition-all duration-300
    ${menuOpen ? "flex mobile-menu" : "hidden"}
    md:static md:flex md:flex-row md:bg-transparent md:text-black md:shadow-none md:p-0 md:gap-6 md:w-auto`}
        >
          <li className="text-center">
            <a href="/inicio" onClick={() => setMenuOpen(false)} className="text-black md:text-black font-semibold hover:text-black">
              Inicio
            </a>
          </li>
          <li className="text-center">
            <a href="#" onClick={() => setMenuOpen(false)} className="ttext-black md:text-black font-semibold hover:text-black">
              Tienda
            </a>
          </li>
          <li className="text-center">
            <a href="#" onClick={() => setMenuOpen(false)} className="text-black md:text-black font-semibold hover:text-black">
              Nosotros
            </a>
          </li>
          <li className="text-center">
            <a href="#" onClick={() => setMenuOpen(false)} className="text-black md:text-black font-semibold hover:text-white">
              Contacto
            </a>
          </li>


          {/* Cesta */}
          <li className="relative text-center no-underline-link"> {/* ← Añade esto aquí */}
            <a
              href="/carrito"
              className="flex items-center justify-center group transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <div className="icon-wrapper relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-[#67b2c1]">
                <ShoppingBagIcon className="w-5 h-5 text-white md:text-black group-hover:text-[#67b2c1] transition-colors" />
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-black text-xs font-bold px-2 py-[1px] rounded-full shadow-md border border-gray-300">
                  {cart.length}
                </span>
              )}
            </a>
          </li>


        </ul>
      </header>

      {/* Cierra el menú si se hace clic fuera */}
      {typeof window !== "undefined" && menuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
      )}

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">
          <div className="hero-text">
            <h2>Descubre el estilo de 2CabrasConTraje</h2>
            <p>Moda exclusiva para quienes buscan algo único.</p>
            <p className="highlight">&quot;Rompe con la norma o ponle los cuernos&quot;</p>
            <a href="#" className="btn">Ver Colección</a>
          </div>
          <div className="hero-video">
            <video autoPlay muted loop playsInline className="w-full h-auto">
              <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5
            </video>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="products">
        <div className="flex flex-col items-center justify-center my-6">
          <h2 className="text-center text-3xl font-bold text-white mb-2">
            Nuestros Productos Destacados
          </h2>
          <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group bg-white p-4 rounded-lg shadow-md relative overflow-visible"
            >


              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="cursor-pointer rounded-md transition-transform"
                onClick={() => openModal(product)}
              />

              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button
                className="btn mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => openModal(product)}
              >
                Ver Producto
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* CARRUSEL DE SUDADERAS */}
      <section className="products mt-0">
        <div className="flex flex-col items-center justify-center my-6">
          <h2 className="text-center text-3xl font-bold text-white mb-2">
            Sudaderas
          </h2>
          <div className="w-[600px] max-w-full h-1 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] rounded"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Flecha izquierda */}
          <button
            onClick={() =>
              setSweaterIndex((prev) =>
                prev === 0 ? sweaters.length - 3 : prev - 1
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
          >
            ‹
          </button>


          {/* Carrusel con transición */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${sweaterIndex * (100 / (isMobile ? 1 : 3))}%)`,
              }}
            >
              {sweaters.map((item) => (
                <div
                  key={item.id}
                  className="carousel-item min-w-[calc(100%/3)] px-3 flex-shrink-0 mb-6"
                >
                  <div className="product-card group bg-white p-4 rounded-lg shadow-md relative">
                    <div className="product-glow"></div>

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="cursor-pointer rounded-md"
                    />
                    <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                    <button
                      className="btn mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      onClick={() =>
                        openModal({
                          ...item,
                          description: "Sudadera de la colección exclusiva",
                          quantity: 1,
                        })
                      }
                    >
                      Ver Producto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Flecha derecha */}
          <button
            onClick={() =>
              setSweaterIndex((prev) =>
                prev >= sweaters.length - 3 ? 0 : prev + 1
              )
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700 transition"
          >
            ›
          </button>
        </div>
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
          <div className="absolute bg-black bg-opacity-200 w-[80%] sm:w-[60%] h-[70%] sm:h-[80%] rounded-lg"></div>

          {/* Contenedor del modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-10 flex">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl hover:text-red-800 hover:scale-120 transition-all duration-300 rounded-full p-1">✖</button>

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
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
                    <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                      <button
                        onClick={() => setShowSizeGuideModal(false)}
                        className="mt-2 w-max px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-md border border-blue-300 hover:bg-blue-200 transition"
                      >
                        ✖
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
                            ["XXXL/3XL", "46", "102-106 cm", "85-89 cm", "113-117 cm"],
                            ["4XL", "48", "107-111 cm", "90-94 cm", "118-122 cm"],
                            ["5XL", "50", "112-116 cm", "95-99 cm", "123-127 cm"],
                            ["PLUS SIZE", "52", "117-121 cm", "100-104 cm", "128-132 cm"]
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


                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="mt-4 w-max px-6 py-2 mx-auto bg-black text-white font-semibold rounded-md transition-all duration-300
             hover:scale-95 hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b] hover:text-white"
                >
                  Añadir a la cesta
                </button>










              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
