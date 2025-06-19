'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || '✅ Te hemos enviado un correo para recuperar tu contraseña.');
      } else {
        setError(data.error || '❌ Error al procesar la solicitud.');
      }
    } catch (err) {
      setError('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-4 py-10">
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mt-16 sm:mt-24">
        <div className="group relative p-[2px] rounded-3xl overflow-hidden transition-all duration-[2000ms]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms] rounded-3xl pointer-events-none" />
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 w-[90vw] max-w-md z-10 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-black">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              Introduce tu correo para enviarte un enlace de recuperación.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full text-black px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white font-semibold rounded-xl shadow-md transition-all duration-400 ease-in-out hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer"
              >
                Enviar enlace
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-green-600 text-sm">{message}</p>
            )}
            {error && (
              <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
