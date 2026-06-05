import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Dicionário Online",
  description:
    "Consulte o significado de palavras em português, com classe gramatical, definições e etimologia. Rápido, simples e sem cadastro.",
  applicationName: "Dicionário Online",
  openGraph: {
    title: "Dicionário Online",
    description: "O significado de palavras em português, na hora. Sem cadastro.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
