"use client";

import { useState} from "react";

import "../styles/globals.css";
import Header from "../components/Header";

export default function Page() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmission = () => {
    if (userInput.trim()) {
      setResponse(`¡Vamos a romper con la norma! 💥 Tu dilema: "${userInput}" será transformado al estilo 2CabrasConTraje: irreverente, único y con actitud. Prepárate para ponerle los cuernos a lo convencional.`);
    } else {
      setResponse("¿Qué quieres desafiar hoy? ¡Escribe tu problema o incógnita!");
    }
  };

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto">
      {/* Menú de navegación */}
      <Header />

      <h2 className="text-center text-4xl font-bold mb-8">2CabrasConTraje: Rompe con la norma</h2>
      
      <section className="mission-vision-values py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <h3 className="text-center text-3xl font-semibold mb-6">¿Por qué Rompe con la norma o ponle los cuernos?</h3>
        <p className="text-gray-700 text-center mb-8">
          Porque hacer lo que todo el mundo hace no siempre es lo correcto. En <span className="font-bold">2CabrasConTraje</span> creemos que hay que desafiar lo establecido, cuestionar lo convencional y, si es necesario, ponerle los cuernos a la norma. ¿Por qué? Porque ser uno mismo a veces implica ir contra corriente, y hacerlo con estilo es lo que mejor sabemos hacer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Filosofía */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h4 className="text-2xl font-semibold text-center mb-4">🎭 Filosofía</h4>
            <p className="text-gray-700 text-center">
              No te conformes. El camino fácil es aburrido. Ponte un traje, pero hazlo a tu manera. Cambia el mundo siendo tú mismo, pero con un toque de irreverencia. 
            </p>
          </div>

          {/* Manifiesto */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h4 className="text-2xl font-semibold text-center mb-4">⚡ Manifiesto</h4>
            <p className="text-gray-700 text-center">
              La moda no es solo estética, es actitud. Si los demás dicen que no puedes, demuestra que puedes, pero a tu estilo. No hay límites cuando llevas traje... ¡y cuernos! 
            </p>
          </div>

          {/* Actitud */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h4 className="text-2xl font-semibold text-center mb-4">🔥 Actitud</h4>
            <p className="text-gray-700 text-center">
              No sigas el rebaño. Haz ruido, haz preguntas y no te conformes. Lo fácil no va contigo. Lo clásico y lo rebelde pueden coexistir... en tu camiseta.
            </p>
          </div>
        </div>

        {/* Interactivo */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center mb-4">¿Qué te quita el sueño?</h3>
          <p className="text-center text-gray-600 mb-4">
            Cuéntanos tu problema, dilema o incógnita, y nosotros lo convertimos en una idea única al estilo 2CabrasConTraje.
          </p>
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Escribe aquí tu problema..."
              className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleSubmission}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Romper la norma
            </button>
            {response && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <p className="text-center text-gray-800">{response}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Recuerda, en <span className="font-bold">2CabrasConTraje</span>, la norma no está escrita... ¡la rompemos a cada paso! 🐐🎩
        </p>
      </div>
    </main>
  );
}
