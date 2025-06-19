"use client";

import { useState, useEffect } from "react";
import "../styles/globals.css";
import Header from "../components/Header";

export default function Page() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loadingIA, setLoadingIA] = useState(false);
  const [errorIA, setErrorIA] = useState<string | null>(null);

  const [fraseRandom, setFraseRandom] = useState("");
  const [loadingRandom, setLoadingRandom] = useState(false);

  const frases = [
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
    }, 800);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains("norma-hover")) {
        target.classList.toggle("active");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmission = async () => {
    setResponse(null);
    setErrorIA(null);

    if (!userInput.trim()) {
      setResponse("¿Qué quieres desafiar hoy? ¡Escribe tu problema o incógnita!");
      return;
    }

    setLoadingIA(true);
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: userInput }),
      });
      const data = await res.json();
      if (data.frase) {
        setResponse(data.frase);
      } else {
        setErrorIA(data.error || "No se pudo generar la frase.");
      }
    } catch (e) {
      setErrorIA("Error al conectar con la IA.");
    }
    setLoadingIA(false);
  };

  return (
    <main className="px-4 py-8 mt-16 sm:mt-8 max-w-6xl mx-auto">
      <Header />

      <section className="mission-vision-values py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <h3 className="text-center text-3xl font-medium mb-10 text-black">
          2CabrasConTraje: Rompe con la <span className="norma-hover">norma</span> o ponle los cuernos
        </h3>
        <p className="text-gray-700 text-center mb-8">
          Porque hacer lo que todo el mundo hace no siempre es lo correcto. En <span className="font-bold">2CabrasConTraje</span> creemos que hay que desafiar lo establecido, cuestionar lo convencional y, si es necesario, ponerle los cuernos a la <span className="norma-hover">norma</span>. ¿Por qué? Porque ser uno mismo a veces implica ir contra corriente, y hacerlo con estilo es lo que mejor sabemos hacer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-pastel-blue rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-2xl font-medium text-center mb-4">🌀 Filosofía</h4>
            <p className="text-gray-800 text-center">
              No te conformes. El camino fácil es aburrido. Ponte un traje, pero hazlo a tu manera. Cambia el mundo siendo tú mismo, pero con un toque de irreverencia.
            </p>
          </div>

          <div className="p-6 bg-pastel-pink rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-2xl font-medium text-center mb-4">⚡ Manifiesto</h4>
            <p className="text-gray-800 text-center">
              La moda no es solo estética, es actitud. Si los demás dicen que no puedes, demuestra que puedes, pero a tu estilo. No hay límites cuando llevas traje... ¡y cuernos!
            </p>
          </div>

          <div className="p-6 bg-pastel-yellow rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-2xl font-medium text-center mb-4">🔥 Actitud</h4>
            <p className="text-gray-800 text-center">
              No sigas el rebaño. Haz ruido, haz preguntas y no te conformes. Lo fácil no va contigo. Lo clásico y lo rebelde pueden coexistir... en tu camiseta.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-medium text-center mb-4 text-black">¿Qué te quita el sueño?</h3>
          <p className="text-center mb-4 text-black">
            Cuéntanos tu problema, dilema o incógnita, y nosotros lo convertimos en una idea única al estilo 2CabrasConTraje.
          </p>
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Escribe aquí tu problema..."
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
            />
            <button
              onClick={handleSubmission}
              disabled={loadingIA}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              {loadingIA ? "Generando frase..." : <>Romper la <span className="norma-hover">norma</span></>}
            </button>
            {response && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <p className="text-center text-gray-800">{response}</p>
              </div>
            )}
            {errorIA && (
              <div className="mt-2 bg-red-100 p-2 rounded text-center text-red-700 text-xs">{errorIA}</div>
            )}
          </div>
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={generarFraseRandom}
              disabled={loadingRandom}
              className="bg-black text-white px-4 py-2 rounded font-bold shadow hover:bg-gradient-to-r hover:from-[#67b2c1] hover:via-[#ff8eaa] hover:to-[#f6bd6b] hover:text-white transition-all mb-2 cursor-pointer"
            >
              {loadingRandom ? "Generando..." : "Generar frase random"}
            </button>
            {fraseRandom && (
              <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-center italic text-black max-w-xl">
                {fraseRandom}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Recuerda, en <span className="font-bold">2CabrasConTraje</span>, la <span className="norma-hover">norma</span> no está escrita... ¡la rompemos a cada paso! 🐐🎩
        </p>
      </div>
    </main>
  );
}
