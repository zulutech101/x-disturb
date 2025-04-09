import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminContextProvider } from "@/components/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-Disturb Dashboard",
  description: "Dashboard for X-Disturb performance monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} scrollbar-hide`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminContextProvider>{children}</AdminContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
