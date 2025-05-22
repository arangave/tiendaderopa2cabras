'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirm) {
      setMessage('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Contraseña actualizada correctamente');
        router.push('/registro');
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage('❌ Error al actualizar la contraseña');
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
              Restablece tu contraseña
            </h2>
            <p className="text-sm text-center text-gray-600 mb-6">
              Introduce tu nueva contraseña
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repetir contraseña"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2c1] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showConfirm ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-[#67b2c1] via-[#ff8eaa] to-[#f6bd6b] text-white font-semibold rounded-xl shadow-md transition-all duration-400 ease-in-out hover:bg-white hover:text-black hover:border hover:border-black"
              >
                Cambiar contraseña
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-red-600">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
