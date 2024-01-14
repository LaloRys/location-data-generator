import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import NavbarUI from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://images.unsplash.com'), // Agrega la metadataBase con tu URL base
  title: "Geolocation Data Processor",
  description: "An application for processing geolocation data from Excel files. Retrieve geocoding and elevation data using OpenCage and Google APIs.",
  openGraph: {
    title: "Geolocation Data Processor",
    description: "Process geolocation data from Excel files and obtain detailed information using OpenCage and Google APIs.",
    siteName: "Geolocation App",
    images: [
      {
        url: "/photo-1599930113854-d6d7fd521f10?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Utiliza una ruta relativa para la imagen
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarUI />
          {children}
        </Providers>
      </body>
    </html>
  );
}
