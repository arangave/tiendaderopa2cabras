// /app/inicio/page.tsx

import type { Metadata } from "next";
import type { Product } from "../data/products";
import InicioCliente from "./InicioCliente";
import {
  destacados,
  rebelTshirts,
  rebelSweaters,
  naughtyTshirts,
  naughtySweaters,
} from "../data/products";

interface InicioPageProps {
  // Next pasa searchParams como una promesa
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Tienda Ropa – Inicio",
  description: "Página principal de la tienda de ropa",
};

export default async function InicioPage({ searchParams }: InicioPageProps) {
  // 1) Espera a que searchParams se resuelva
  const params = await searchParams;

  // 2) Accede a params.unsubscribed, no a searchParams.unsubscribed
  const unsubValue = params.unsubscribed;
  const unsubscribed =
    Array.isArray(unsubValue)
      ? unsubValue[0] === "true" || unsubValue[0] === "1"
      : unsubValue === "true" || unsubValue === "1";

  return (
    <main>
      <InicioCliente
        unsubscribed={unsubscribed}
        destacados={destacados}
        rebelTshirts={rebelTshirts}
        rebelSweaters={rebelSweaters}
        naughtyTshirts={naughtyTshirts}
        naughtySweaters={naughtySweaters}
      />
    </main>
  );
}
