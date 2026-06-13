import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactDrawer from "@/components/ContactDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tealis – Data Management & Microsoft Consulting",
  description:
    "Tealis helps organizations transform data into business value through end-to-end data management, analytics, automation and Microsoft-powered business transformation.",
  keywords:
    "data management, analytics, Microsoft Fabric, Power BI, Power Platform, data engineering, corporate training, Microsoft partner",
  openGraph: {
    title: "Tealis – Data Management & Microsoft Consulting",
    description:
      "End-to-end data management, analytics, automation and Microsoft-powered business transformation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-[#22252A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactDrawer />
      </body>
    </html>
  );
}
