import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeToggleButton from "./components/ThemeToggleButton";

export const metadata = {
  title: "2CabrasConTraje",
  description: "Moda exclusiva para quienes buscan algo único.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-[#181818] text-black dark:text-white dark:bg-black dark:text-white transition-colors duration-300">
        <Header />
        <ThemeToggleButton />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
