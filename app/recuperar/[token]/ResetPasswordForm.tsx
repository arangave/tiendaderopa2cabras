'use client';

import { useState } from 'react';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Contraseña actualizada correctamente');
      window.location.href = '/registro';
    } else {
      alert('❌ ' + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Restablecer contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-2"
        required
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full border p-2 mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Cambiar contraseña
      </button>
    </form>
  );
}
