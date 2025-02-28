"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, LogOut } from "lucide-react";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            WeddingSnap
          </span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/dashboard/albums"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname.startsWith("/dashboard/albums")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Albums
          </Link>
          <Link
            href="/dashboard/settings"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard/settings"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
