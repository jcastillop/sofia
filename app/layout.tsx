"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

import { SessionProvider } from "next-auth/react";
import { OrderProvider, UiProvider } from "@/context";
import { lightTheme } from "@/themes";
import { ThemeProvider } from "@emotion/react";
import { Alerta } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="es">
        <UiProvider>
          <OrderProvider>
            <ThemeProvider theme={ lightTheme }>
              <body className={inter.className}>{children}</body>
            </ThemeProvider>
          </OrderProvider>
        </UiProvider>
      </html>
    </SessionProvider>
  );
}
