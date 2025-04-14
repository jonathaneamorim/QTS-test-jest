import "./globals.css";

export const metadata = {
  title: "Social QA",
  description: "Plataform of publish free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
