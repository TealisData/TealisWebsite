import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactDrawer from "@/components/ContactDrawer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
