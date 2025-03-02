import { TopBar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <Suspense>{children}</Suspense>
      <Footer />
    </>
  );
}
