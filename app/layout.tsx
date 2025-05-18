'use client'

import "./globals.css";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import GlobalAdvertise from "./components/headers/GlobalAdvertise";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <div className="">
          <GlobalAdvertise />
          <Navbar />
          <div className="container">

            {children}
          </div>
          <Toaster position="top-center" reverseOrder={false} />

          <Footer />
        </div>
      </body>
    </html>
  );
}
