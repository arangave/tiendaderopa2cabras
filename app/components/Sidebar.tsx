"use client";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  categoriaFiltro: { categoria: string; tipo: string };
  setCategoriaFiltro: (filtro: { categoria: string; tipo: string }) => void;
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  selectedMain: string | null;
  setSelectedMain: (section: string) => void;
}

const underlineClass =
  "relative text-left w-fit transition-all duration-100 hover:after:w-full after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#67b2c1] after:via-[#ff8eaa] after:to-[#f6bd6b] after:rounded after:transition-all after:duration-700";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  categoriaFiltro,
  setCategoriaFiltro,
  openSections,
  toggleSection,
  selectedMain,
  setSelectedMain,
}: SidebarProps) {
  const handleCategoryClick = (categoria: string, tipo: string) => {
    setCategoriaFiltro({ categoria, tipo });
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <>
      {!sidebarOpen && (
        <div className="fixed top-[115px] left-4 z-50 pt-4 mt-5rem">
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 p-2 rounded-full bg-black text-white"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      )}

      <aside
        className={`z-50 bg-white/90 text-black backdrop-blur-sm transition-transform duration-300 ease-in-out
        md:fixed md:top-[115px] md:h-[calc(100vh-2rem)] md:w-64 md:overflow-y-auto
        fixed top-[88px] left-0 w-full bottom-[64px] px-6 pb-6 pt-20
        flex flex-col items-center justify-start md:block
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-lg font-bold mb-6">Categorías</h2>
        <ul className="space-y-4">
          {[
            { label: "Cabras Rebeldes", sub: ["CAMISETA", "SUDADERA"] },
            { label: "Cabras Traviesas", sub: ["CAMISETA", "SUDADERA"] },
          ].map((section) => (
            <li key={section.label}>
              <button
                onClick={() => {
                  toggleSection(section.label);
                  setSelectedMain(section.label);
                }}
                className={`${underlineClass} font-bold ${
                  selectedMain === section.label ? "after:w-full" : ""
                }`}
              >
                {section.label}
              </button>
              {openSections[section.label] && (
                <ul className="mt-2 space-y-2 text-center">
                  {section.sub.map((item) => (
                    <li key={`${section.label}-${item}`}>
                      <button
                        onClick={() => handleCategoryClick(section.label, item)}
                        className={`${underlineClass} text-sm ${
                          categoriaFiltro.categoria === section.label &&
                          categoriaFiltro.tipo === item
                            ? "after:w-full font-semibold text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black text-white "
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </aside>
    </>
  );
}
