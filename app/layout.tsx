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
      <head>
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6102136867747482"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MyDiv>
          <GlobalAdvertise />
          <Navbar />
          {children}
          <Toaster position="top-center" reverseOrder={false} />

          {/* Example Ad Unit (You can place this anywhere you want ads to show) */}
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6580779703282784"
            data-ad-slot="1052370986"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <Script id="ads-init" strategy="afterInteractive">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>

          <Footer />
        </MyDiv>

        {/* OneSignal Push Notifications */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        />
      </body>
    </html>
  );
}
