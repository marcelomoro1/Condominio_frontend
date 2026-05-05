import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Condomínio - Sistema de Gestão",
  description: "Sistema completo de gestão de condomínios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans" style={{ fontFamily: 'var(--font-inter)' }}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
