'use client'

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalAdvertise from "./components/headers/GlobalAdvertise";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import MyDiv from "./common/MyDiv";
import Script from "next/script";

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
          <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_CLIENT_SECRET_KEY}`}
            crossOrigin="anonymous"></Script>
          <Footer />
        </MyDiv>
        {/* one signal sdk import */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
      </body>
    </html>
  );
}
