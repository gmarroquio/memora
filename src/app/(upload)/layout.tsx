import { Suspense } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Loading from "./add-photo/loading";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col">
      <header className="hidden md:flex items-center justify-center p-2 md:p-4">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="md:h-9 md:w-9 text-primary" />
          <span className="md:text-4xl font-semibold tracking-tight">
            WeddingSnap
          </span>
        </Link>
      </header>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
