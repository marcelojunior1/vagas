import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutApp from "@/app/_components/LayoutApp";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vagas",
  description: "Sistema vagas",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="pt-br">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <LayoutApp>
            {children}
          </LayoutApp>
        </body>
      </html>
  );
}
