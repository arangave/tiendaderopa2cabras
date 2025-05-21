export default function Bienvenida() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-8">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-20 h-20 mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        ¡Tu cuenta ha sido verificada! ✅
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Gracias por confirmar tu correo electrónico. Ya puedes acceder a tu cuenta y comenzar a explorar.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
      >
        Iniciar sesión
      </a>
    </div>
  );
}
