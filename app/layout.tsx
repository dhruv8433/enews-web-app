import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalAdvertise from "./components/headers/GlobalAdvertise";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { siteName } from "./site/site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: `${siteName} | Discover the latest information`,
  description: "Discover the latest information",
};

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
        <GlobalAdvertise />
        <Navbar />
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Footer />
        {/* chatbot */}
        <script id="messenger-widget-b" src="https://cdn.botpenguin.com/website-bot.js" defer>67bc6c824deb655bc5929564,66db0b8d8014ed2ba71b6974</script>
      </body>
    </html>
  );
}
