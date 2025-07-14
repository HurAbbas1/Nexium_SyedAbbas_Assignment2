import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Summariser",
  description: "Summarise blogs and translate to Urdu with beautiful UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen 
          text-white 
          overflow-x-hidden 
          transition-colors 
          duration-1000 
          font-sans
        `}
        style={{
          background: "linear-gradient(135deg, #1a002b, #220052, #0d001f)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 10s ease infinite",
        }}
      >
        {children}
      </body>
    </html>
  );
}
