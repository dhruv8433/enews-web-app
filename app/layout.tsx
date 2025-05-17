'use client'

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalAdvertise from "./components/headers/GlobalAdvertise";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import MyDiv from "./common/MyDiv";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <MyDiv>
          <GlobalAdvertise />
          <Navbar />
          {children}
          <Toaster position="top-center" reverseOrder={false} />

          <Footer />
        </MyDiv>
      </body>
    </html>
  );
}
