import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import { AppContextProvider } from "./context/AppContext";
import { Navbar } from "./component/Navbar";
import Footer from "./component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Izzy Hotel and Home amenities",
  description: "all Hotel and Home amenities",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.className}antialiased text-gray-700 h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       
        <AppContextProvider>
          <Navbar/>
           <Toaster position="top-right" />
            {children}
            <Footer/>
        </AppContextProvider>
      
        
      </body>
    </html>
  );
}
