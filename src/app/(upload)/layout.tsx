import { Suspense } from "react";
import Link from "next/link";
import Loading from "./add-photo/loading";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col">
      <header className="absolute bg-white top-4 right-0 border rounded-l-md py-1 px-2 shadow-md">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-semibold text-sm tracking-tight text-primary-foreground">
            powered by
          </span>
          <span className="font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
            Memora
          </span>
        </Link>
      </header>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
