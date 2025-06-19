import Image from "next/image";

export default function ContactoPage() {
  return (
    <main className="relative min-h-screen flex items-start justify-center pt-40 pb-16 px-6 overflow-hidden">
      <video
        src="/videos/Proyecto de vídeo 5.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative w-full max-w-md mx-auto p-8 rounded-xl border border-white/30 backdrop-blur-md">
        <h1
          className="text-4xl font-bold mb-4 text-center bg-clip-text text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/videos/Proyecto de vídeo 5.mp4')" }}
        >
          Contacto
        </h1>

        <p className="text-lg text-white/90 mb-6 text-center">
          ¿Tienes alguna duda, sugerencia o simplemente quieres saludarnos? 🐐  
          En <strong className="text-white">2Cabras Con Traje</strong> estamos encantados de escucharte.  
          Escríbenos o mándanos un WhatsApp cuando quieras, ¡sin miedo!
        </p>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="flex items-center gap-2 justify-center text-white/90">
            <span className="text-2xl">📧</span>
            <a
              href="mailto:hola@2cabrascontraje.com"
              className="text-white font-medium hover:underline"
            >
              hola@2cabrascontraje.com
            </a>
          </div>
          <div className="flex items-center gap-2 justify-center text-white/90">
            <span className="text-2xl">💬</span>
            <a
              href="https://wa.me/34611222333"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:underline"
            >
              +34 611 222 333
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Image
            src="/images/nuevo-logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-lg"
            priority
          />
        </div>

        <p className="text-sm text-white/70 mt-6 text-center">
          Te responderemos lo antes posible. ¡Gracias por formar parte del mundo 2Cabras!
        </p>
      </div>
    </main>
  );
}
