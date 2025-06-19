import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function IAFlotante() {
  const [open, setOpen] = useState(false);

  const [fraseRandom, setFraseRandom] = useState("");
  const [loadingRandom, setLoadingRandom] = useState(false);
  const frases = [
    "“A veces solo necesitas dos cabras con traje para conquistar el mundo.”",
    "“El éxito es cuestión de actitud... y de cuernos.”",
    "“No sigas el rebaño, vístete diferente.”",
    "“Cabras y trajes: combinación ganadora.”",
    "“El sistema teme a las cabras con estilo.”",
    "“Si la vida te da un rebaño, sé la cabra con más flow.”",
    "“Donde todos ven reglas, nosotros vemos cuernos.”",
    "“Las cabras con traje saltan más alto.”",
    "“Ponle traje a tus ideas y deja que las cabras las lleven lejos.”",
    "“Rompe el molde, luce los cuernos.”",
    "“No hace falta seguir al pastor si puedes liderar el rebaño.”",
    "“La moda es pasajera, los cuernos son para siempre.”",
    "“La rebeldía se lleva mejor en traje.”",
    "“No temas destacar, teme ser normal.”",
    "“En un mundo de ovejas, sé cabra con corbata.”",
    "“A veces para escalar hay que tener cuernos… y un buen traje.”",
    "“Lo imposible es solo lo que no ha intentado una cabra con traje.”",
    "“Si nadie te entiende, es que ya vas por delante.”",
    "“El éxito se mide en saltos, no en pasos.”",
    "“Haz ruido, deja huella, lleva traje.”",
    "“Los sueños grandes piden trajes a medida… y cuernos afilados.”",
    "“Atrévete a desentonar, ahí está la magia.”"
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

  const [pregunta, setPregunta] = useState("");
  const [fraseIA, setFraseIA] = useState("");
  const [loadingIA, setLoadingIA] = useState(false);
  const [errorIA, setErrorIA] = useState("");

  const ENDPOINT_IA = "/api/ia";

const generarFraseIA = async () => {
  setFraseIA("");
  setLoadingIA(true);

  try {
    const res = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta }),
    });
    const data = await res.json();
    setFraseIA(data.frase || "No se pudo generar la frase.");
  } catch {
    setFraseIA("Error generando la frase.");
  } finally {
    setLoadingIA(false);
  }
};

  const buttonRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ right: number; bottom: number }>({ right: 24, bottom: 24 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current && !isMobile) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPanelPos({
        right: window.innerWidth - rect.right,
        bottom: window.innerHeight - rect.bottom,
      });
    }
  }, [open, isMobile]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group" ref={buttonRef}>
        <div className="hidden sm:flex
          absolute right-full bottom-1/2 translate-y-1/2 mr-4 items-center w-max z-50 pointer-events-none
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
              relative bg-white text-white br-black p-3 sm:p-3 rounded-full
              shadow-[0_8px_20px_rgba(0,0,0,0.4)] text-2xl sm:text-2xl cursor-pointer
              focus:outline-none overflow-hidden
              group
            "
            aria-label='Abrir IA'
          >
            <span className="relative z-10">🐐</span>
            <span
              className="
                absolute inset-0 z-0 rounded-full
                bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]
                opacity-0 group-hover:opacity-100
                transition-opacity duration-700 ease-in-out
              "
            />
          </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[1000] bg-black/20 backdrop-blur-[2px]"
            onClick={handleBackdropClick}
          />
          <div
            style={
              isMobile
                ? {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1001,
                  }
                : {
                    position: "fixed",
                    right: panelPos.right + 64,
                    bottom: panelPos.bottom,
                    zIndex: 1001,
                  }
            }
            className={`
              bg-white p-4 sm:p-6 rounded-t-xl sm:rounded-xl w-full
              ${isMobile ? "max-w-full" : "max-w-lg"}
              shadow-xl border border-gray-200 text-black
              transition-all duration-300
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold">Frase estilo 2 Cabras</div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-black transition-colors duration-300 cursor-pointer" aria-label="Cerrar IA"><X /></button>
            </div>

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
                  text-sm sm:text-base cursor-pointer
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


            <div className="my-6 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" />
              <span className="text-xs text-gray-400 font-semibold">o crea tu propia frase</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b]" />
            </div>

            <div>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mb-3 text-black text-sm sm:text-base"
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
                  text-sm sm:text-base
                  disabled:opacity-60 cursor-pointer
                "
              >
                {loadingIA ? "Generando..." : "Generar frase personalizada"}
              </button>
              {fraseIA && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-center italic text-black">
                  {fraseIA}
                </div>
              )}
              {errorIA && (
                <div className="mt-2 p-2 rounded text-center bg-red-100 text-red-700 text-xs">
                  {errorIA}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
