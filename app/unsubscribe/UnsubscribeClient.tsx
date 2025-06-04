"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      router.replace("/inicio?unsubscribed=0");
      return;
    }

    // Llama a la API
    fetch(`/api/auth/newsletter/unsubscribe?email=${encodeURIComponent(email)}`)
      .then(() => {
        // Después de procesar, redirige al inicio con el mensaje
        router.replace("/inicio?unsubscribed=1");
      })
      .catch(() => {
        router.replace("/inicio?unsubscribed=0");
      });
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-xl font-semibold text-black p-8 rounded shadow-md">
        Procesando tu baja...
      </div>
    </div>
  );
}




