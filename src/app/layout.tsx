import { NextUIProvider } from "@nextui-org/system";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import GetUser from "~/components/common/get-user";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Snap Car Rental: The best car rental service out there",
  description: "We provide car rental services in the USA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextUIProvider>
            <Toaster />
            <GetUser />
            {children}
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
