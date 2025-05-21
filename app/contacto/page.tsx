// app/contacto/page.tsx

export default function ContactoPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Contacto</h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        ¿Tienes alguna duda, sugerencia o simplemente quieres saludarnos? 🐐  
        En <strong>2Cabras Con Traje</strong> estamos encantados de escucharte.  
        Escríbenos o mándanos un WhatsApp cuando quieras, ¡sin miedo!
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Datos de contacto</h2>

        <p className="mb-3">
          📧 <strong>Email:</strong>{' '}
          <a href="mailto:hola@2cabrascontraje.com" className="text-blue-600 hover:underline">
            hola@2cabrascontraje.com
          </a>
        </p>

        <p className="mb-3">
          💬 <strong>WhatsApp:</strong>{' '}
          <a
            href="https://wa.me/34611222333"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            +34 611 222 333
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-6">
          Te responderemos lo antes posible. ¡Gracias por formar parte del mundo 2Cabras!
        </p>
      </div>
    </main>
  );
}
