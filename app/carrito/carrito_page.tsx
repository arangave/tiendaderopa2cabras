"use client";
import { useState } from "react";
import Image from "next/image";
import "./styles/globals.css";

// Definimos la estructura del producto
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number; // Añadimos la cantidad al producto
}

export default function Carrito() {
  const [cart, setCart] = useState<Product[]>([]);

  const removeFromCart = (id: number) => {
    // Eliminar producto del carrito
    setCart(cart.filter(product => product.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(cart.map((product) =>
      product.id === id ? { ...product, quantity } : product
    ));
  };

  const totalPrice = cart.reduce((total, product) => {
    const price = parseFloat(product.price.replace("€", "").replace(",", "."));
    return total + price * product.quantity;
  }, 0).toFixed(2);

  return (
    <main>
      {/* HEADER */}
      <header className="header">
        <nav>
          <ul className="nav-links">
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="#">Tienda</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li className="relative">
              <a href="/carrito" className="flex items-center">
                 <span className="ml-1">Carrito ({cart.length})</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Carrito Section */}
      <section className="carrito">
        <h2 className="text-center text-3xl font-bold my-6">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-center text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="p-4">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center border-b p-4">
                <div className="flex items-center">
                  <Image src={product.image} alt={product.name} width={80} height={80} className="rounded-md" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-sm">{product.quantity} x {product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Input para actualizar cantidad */}
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.id, Math.max(1, parseInt(e.target.value)))}
                    min="1"
                    className="w-16 p-2 border rounded-md text-center"
                  />
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-semibold">Total: {totalPrice}€</p>
              <button
                className="btn bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
                onClick={() => alert('Ir a realizar el pedido')} // Aquí deberíamos manejar el paso al pago
              >
                Tramitar Pedido
              </button>
            </div>
          </div>
        )}
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
    </main>
  );
}
