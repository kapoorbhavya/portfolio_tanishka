import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/app/components/SiteChrome";
import SplashCursorWrapper from "@/app/components/SplashCursorWrapper";
import LenisProvider from "@/app/components/LenisProvider";
import PageTransition from "@/app/components/PageTransition";
import ScrollIndicator from "@/app/components/ScrollIndicator";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanishka Rana | Data Engineer",
  description: "I help organizations turn raw data into intelligent systems and actionable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: "#030303" }}>
      <body className={`${inter.className} bg-[#030303] text-white antialiased`}>
        <SplashCursorWrapper />
        <LenisProvider>
          <PageTransition>
            <main className="relative z-10 bg-transparent">{children}</main>
          </PageTransition>
        </LenisProvider>
        <SiteChrome />
        <ScrollIndicator />
      </body>
    </html>
  );
}
