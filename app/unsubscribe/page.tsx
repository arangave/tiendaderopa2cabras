// /app/unsubscribe/page.tsx

import dynamic from "next/dynamic";

export const metadata = {
  title: "Cancelar suscripción – Tienda Ropa",
  description: "Procesando baja de newsletter…",
};

// Importamos el componente cliente de manera dinámica y solo en el navegador.
const UnsubscribeClient = dynamic(() => import("./UnsubscribeClient"), {
  ssr: false,
});

export default function Page() {
  // No hay hooks de cliente aquí
  return <UnsubscribeClient />;
}
