import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function IAFlotante() {
  const [open, setOpen] = useState(false);

  // Random phrase
  const [fraseRandom, setFraseRandom] = useState("");
  const [loadingRandom, setLoadingRandom] = useState(false);
  const frases = [
    "“A veces solo necesitas dos cabras con traje para conquistar el mundo.”",
    "“El éxito es cuestión de actitud... y de cuernos.”",
    "“No sigas el rebaño, vístete diferente.”",
    "“Cabras y trajes: combinación ganadora.”"
  ];
  const generarFraseRandom = () => {
    setFraseRandom("");
    setLoadingRandom(true);
    setTimeout(() => {
      const nueva = frases[Math.floor(Math.random() * frases.length)];
      setFraseRandom(nueva);
      setLoadingRandom(false);
    }, 1000);
  };

  // Personalizada con IA
  const [pregunta, setPregunta] = useState("");
  const [fraseIA, setFraseIA] = useState("");
  const [loadingIA, setLoadingIA] = useState(false);

  const generarFraseIA = async () => {
    setFraseIA("");
    setLoadingIA(true);
    // Simulación: sustituye por tu llamada real a IA
    setTimeout(() => {
  setFraseIA(
    `“Aunque te quite el sueño: ${pregunta}, recuerda que dos cabras con traje pueden con todo.”`
  );
  setLoadingIA(false);
}, 1200);

  };

  // Modal align
  const buttonRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ right: number; bottom: number }>({ right: 24, bottom: 24 });
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPanelPos({
        right: window.innerWidth - rect.right,
        bottom: window.innerHeight - rect.bottom,
      });
    }
  }, [open]);

  // Click fuera cierra modal
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-50 group" ref={buttonRef}>
        {/* Tooltip */}
        <div className="
          absolute right-full bottom-1/2 translate-y-1/2 mr-4 flex items-center w-max z-50 pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-1000
          -translate-x-2 group-hover:translate-x-0
          scale-95 group-hover:scale-100
        ">
          <span className="bg-black rounded px-3 py-1 shadow-lg flex items-center">
            <span className="bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] bg-clip-text text-transparent font-semibold whitespace-nowrap text-sm drop-shadow">
              Genera tu frase al estilo 2 Cabras
            </span>
          </span>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            bg-black text-white p-3 rounded-full shadow-xl
            transition-colors duration-[1500ms] ease-in-out
            group-hover:bg-gradient-to-r group-hover:from-[#67b2c1]/40 group-hover:via-[#ff8eaa]/40 group-hover:to-[#f6bd6b]/40
            group-hover:text-white
            focus:outline-none
          "
          aria-label="Abrir IA"
        >
          🐐
        </button>
      </div>

      {/* MODAL y fondo backdrop clicable */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[1000]"
            style={{ background: "transparent" }}
            onClick={handleBackdropClick}
          />
          <div
            style={{
              position: "fixed",
              right: panelPos.right + 64,
              bottom: panelPos.bottom,
              zIndex: 1001,
            }}
            className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl border border-gray-200 text-black"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold">Frase estilo 2 Cabras</div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-black transition-colors duration-300" aria-label="Cerrar IA"><X /></button>
            </div>

            {/* GENERADOR RANDOM */}
            <div>
              <button
                onClick={generarFraseRandom}
                disabled={loadingRandom}
                className="
                  bg-black text-white px-4 py-2 rounded w-full
                  transition-all duration-500
                  hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b]
                  hover:text-white
                  active:scale-95
                  focus:outline-none
                  font-bold
                  shadow
                "
              >
                {loadingRandom ? "Generando..." : "Generar frase random"}
              </button>
              {fraseRandom && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-center italic text-black">
                  {fraseRandom}
                </div>
              )}
            </div>

            {/* Separador visual */}
            <div className="my-6 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" />
              <span className="text-xs text-gray-400 font-semibold">o crea tu propia frase</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" />
            </div>

            {/* GENERADOR PERSONALIZADO */}
            <div>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mb-3 text-black"
                placeholder="¿Qué te quita el sueño?"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
              />
              <button
                onClick={generarFraseIA}
                disabled={loadingIA || !pregunta.trim()}
                className="
                  bg-black text-white px-4 py-2 rounded w-full
                  transition-all duration-500
                  hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b]
                  hover:text-white
                  active:scale-95
                  focus:outline-none
                  font-bold
                  shadow
                  disabled:opacity-60
                "
              >
                {loadingIA ? "Generando..." : "Generar frase personalizada"}
              </button>
              {fraseIA && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-center italic text-black">
                  {fraseIA}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
