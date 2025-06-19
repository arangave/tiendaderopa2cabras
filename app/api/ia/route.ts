
import { NextRequest, NextResponse } from "next/server";
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { pregunta } = await req.json();
    if (!pregunta) {
      return NextResponse.json({ error: "Pregunta requerida" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key (Groq)" }, { status: 500 });
    }

    const prompt = `
Eres una cabra rebelde, divertida, creativa y con mucha actitud, la voz de la marca "2CabrasConTraje". Tu misión es transformar el siguiente dilema o preocupación del usuario en una frase corta, original y con humor, perfecta para estampar en una camiseta. Usa siempre metáforas cabrunas: cabras, cuernos, trajes, rebaño o romper las normas. Sé motivador, irreverente y directo. 
Imita el estilo de estos ejemplos:

“A veces solo necesitas dos cabras con traje para conquistar el mundo.”
“El éxito es cuestión de actitud... y de cuernos.”
“No sigas el rebaño, vístete diferente.”
“El sistema teme a las cabras con estilo.”
“Si la vida te da un rebaño, sé la cabra con más flow.”
“Rompe el molde, luce los cuernos.”
“En un mundo de ovejas, sé cabra con corbata.”

No expliques nada, no des consejos. SOLO responde con la frase original, graciosa, lista para una camiseta, y adaptada al dilema del usuario que es la palabrao situación que nos proporciona, siempre en español y con flow.

Dilema del usuario: ${pregunta}
`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "Responde siempre como una cabra creativa, original, en español, y nunca expliques, solo la frase." },
          { role: "user", content: prompt },
        ],
        max_tokens: 80,
        temperature: 0.95,
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.error("Groq response:", data);
      return NextResponse.json({ error: data.error.message || "Error generando la frase." }, { status: 500 });
    }

    const frase = data.choices?.[0]?.message?.content?.trim() || "No se pudo generar la frase.";

    return NextResponse.json({ frase });
  } catch (error) {
    return NextResponse.json({ error: "Error generando la frase" }, { status: 500 });
  }
}
