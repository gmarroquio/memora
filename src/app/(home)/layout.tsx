import { TopBar } from "@/components/topbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  );
}
