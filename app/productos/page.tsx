"use client";

import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import SizeGuideModal from "../components/SizeGuideModal";
import ProductoCard from "../components/ProductoCard";
import Sidebar from "../components/Sidebar";

interface CategoriaConProductos {
  id: number;
  nombre: string;
  productos: ProductoAPI[];
}

interface ProductoAPI {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  tipo: string;
  imagenes: { url: string }[];
  colores: { nombre: string; hex: string; imagenUrl?: string }[];
  categoria: { nombre: string };
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  quantity: number;
  colors?: {
    name: string;
    hex: string;
    image: string;
  }[];
}

function mapProductoAPIToProduct(producto: ProductoAPI): Product {
  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.descripcion,
    price: producto.precio.toFixed(2) + "€",
    image: producto.imagenes[0]?.url || "/images/default.png",
    quantity: 1,
    colors: producto.colores.map((c) => ({
      name: c.nombre,
      hex: c.hex,
      image: c.imagenUrl || producto.imagenes[0]?.url || "/images/default.png",
    })),
  };
}

export default function ProductosPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState({ categoria: "", tipo: "CAMISETA" });
  const [categorias, setCategorias] = useState<CategoriaConProductos[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [likes, setLikes] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchCategoriasConProductos() {
      try {
        const res = await fetch("/api/categories-with-products");
        const data: CategoriaConProductos[] = await res.json();
        setCategorias(data);

        if (data.length > 0) {
          setCategoriaFiltro({ categoria: data[0].nombre, tipo: "CAMISETA" });
        }
      } catch (error) {
        console.error("Error cargando categorías y productos:", error);
      }
    }
    fetchCategoriasConProductos();
  }, []);

  const isLiked = (id: number) => likes.some((p) => p.id === id);

  const toggleLike = (product: Product) => {
    setLikes((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const addToCart = ({
    product,
    frase,
    tipoFrase,
    color,
    colorHex,
    colorImage,
    size,
    quantity,
  }: {
    product: Product;
    frase: string;
    tipoFrase: string;
    color: string;
    colorHex: string;
    colorImage: string;
    size: string;
    quantity: number;
  }) => {
    if (!size) return alert("Selecciona una talla");
    const productoFinal = {
      ...product,
      quantity,
      size,
      phrase: frase,
      tipoFrase,
      color,
      colorHex,
      colorImage,
    };
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...currentCart, productoFinal]));
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  };

  const categoriaSeleccionada = categorias.find((c) => categoriaFiltro.categoria === c.nombre);
  const productosFiltrados =
    categoriaSeleccionada?.productos.filter(
      (p) => p.tipo && p.tipo.toUpperCase() === categoriaFiltro.tipo.toUpperCase()
    ) || [];

  return (
    <div className="flex pt-28 flex-1 w-full">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        categoriaFiltro={categoriaFiltro}
        setCategoriaFiltro={setCategoriaFiltro}
        openSections={openSections}
        toggleSection={(s) => setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }))}
        selectedMain={selectedMain}
        setSelectedMain={setSelectedMain}
      />

      <main
        className={
          "transition-all duration-300 px-4 py-2 grid gap-6 pl-10 w-full " +
          "grid-cols-1 sm:grid-cols-2 " +
          (sidebarOpen ? "md:grid-cols-3 lg:grid-cols-4 md:ml-64 " : "md:grid-cols-3 lg:grid-cols-4 ") +
          (sidebarOpen && isMobile ? "hidden" : "")
        }
      >
        {productosFiltrados.map((productoAPI) => {
          const product = mapProductoAPIToProduct(productoAPI);
          return (
            <ProductoCard
              key={product.id}
              product={product}
              isLiked={isLiked(product.id)}
              onToggleLike={() => toggleLike(product)}
              onOpenModal={() => setSelectedProduct(product)}
            />
          );
        })}
      </main>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          selectedSize={selectedSize}
          quantity={quantity}
          zoom={zoom}
          zoomPosition={zoomPosition}
          isLiked={isLiked(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={({ frase, tipoFrase, color, colorHex, colorImage, size, quantity }) =>
            addToCart({
              product: selectedProduct,
              frase,
              tipoFrase,
              color,
              colorHex,
              colorImage,
              size,
              quantity,
            })
          }
          onSelectSize={setSelectedSize}
          onZoomMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomPosition({ x, y });
          }}
          onToggleLike={() => toggleLike(selectedProduct)}
          onShowSizeGuide={() => setShowSizeGuideModal(true)}
          onQuantityChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
      )}

      {showSizeGuideModal && <SizeGuideModal onClose={() => setShowSizeGuideModal(false)} />}
    </div>
  );
}
