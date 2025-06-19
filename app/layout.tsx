import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IAFlotante from "./components/IAFlotante";

export const metadata = {
  title: "2CabrasConTraje",
  description: "Moda exclusiva para quienes buscan algo único.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <IAFlotante /> 
      </body>
    </html>
  );
}

