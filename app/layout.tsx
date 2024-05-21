import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar"

const font = Montserrat({ 
  weight: "500",
  preload: false
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-slate-950 text-white ${font.className}`}>
        <Navbar/>

        <main className="mx-auto max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
