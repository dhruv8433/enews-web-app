'use client'

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalAdvertise from "./components/headers/GlobalAdvertise";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { useTheme } from "@mui/material";
import MyDiv from "./common/MyDiv";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <MyDiv >
            <GlobalAdvertise />
            <Navbar />
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <Footer />
          </MyDiv>
        
      </body>
    </html>
  );
}
