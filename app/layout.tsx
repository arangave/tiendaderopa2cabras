// app/layout.tsx o layout.jsx
import "./styles/globals.css";

export const metadata = {
  title: '2CabrasConTraje',
  description: 'Moda exclusiva para quienes buscan algo único.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
