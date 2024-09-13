import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Snap Car Rental: The best car rental service out there",
  description: "We provide car rental services in the USA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextUIProvider>
            <Toaster />
            {children}
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
