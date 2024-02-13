"use client"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { SessionProvider } from "next-auth/react";
import { UiProvider } from "@/context";
import { lightTheme } from "@/themes";
import { ThemeProvider } from "@emotion/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <UiProvider>
        <ThemeProvider theme={ lightTheme }>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
        </UiProvider>
      </html>
    </SessionProvider>
  );
}
