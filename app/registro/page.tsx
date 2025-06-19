"use client";

import dynamic from "next/dynamic";
const RegistroForm = dynamic(() => import("../components/RegistroForm"), { ssr: false });

export default function RegistroPage() {
  return <RegistroForm />;
}

