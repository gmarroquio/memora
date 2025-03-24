import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { PostHogProvider } from "./providers";
import { IntlProvider } from "./intl-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memora",
  description: "See your party by your guests lens",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <IntlProvider>
            <PostHogProvider>
              {children}
              <Toaster />
            </PostHogProvider>
          </IntlProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
