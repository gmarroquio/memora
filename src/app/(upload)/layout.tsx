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
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <footer className="absolute bottom-4 right-0 border rounded-l-md py-1 px-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold text-sm tracking-tight">
            powered by WeddingSnap
          </span>
        </Link>
      </footer>
    </div>
  );
}
