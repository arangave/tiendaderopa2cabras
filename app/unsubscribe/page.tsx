// /app/unsubscribe/page.tsx

import dynamic from "next/dynamic";

export const metadata = {
  title: "Cancelar suscripción",
  description: "Procesando baja de newsletter…",
};

// Importamos dinámicamente el componente cliente, solo en navegador
const UnsubscribeClient = dynamic(() => import("./UnsubscribeClient"), {
  ssr: false,
});

export default function Page() {
  // No hay hooks de cliente aquí
  return <UnsubscribeClient />;
}
