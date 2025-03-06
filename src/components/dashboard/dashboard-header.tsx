"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlbumIcon, CogIcon, Heart, ImagesIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import text from "@/constants/texts.json";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <aside className="w-52 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center py-8 px-4 space-y-8 pb-20">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            {text.pt.dashboard.sidebar.title}
          </span>
        </Link>
        <nav className="flex flex-col items-center space-y-4 lg:space-y-6 my-6">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors flex items-center justify-center space-x-2 hover:text-primary",
              pathname === "/dashboard"
                ? "text-primary font-bold"
                : "text-muted-foreground"
            )}
          >
            <ImagesIcon />
            <span>{text.pt.dashboard.sidebar.nav.gallery}</span>
          </Link>
          <Link
            href="/dashboard/albums"
            className={cn(
              "text-sm font-medium transition-colors flex items-center justify-center space-x-2 hover:text-primary",
              pathname.startsWith("/dashboard/albums")
                ? "text-primary font-bold"
                : "text-muted-foreground"
            )}
          >
            <AlbumIcon />
            <span>{text.pt.dashboard.sidebar.nav.albums}</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "text-sm font-medium transition-colors flex items-center justify-center space-x-2 hover:text-primary",
              pathname === "/dashboard/settings"
                ? "text-primary font-bold"
                : "text-muted-foreground"
            )}
          >
            <CogIcon />
            <span>{text.pt.dashboard.sidebar.nav.settings}</span>
          </Link>
        </nav>
        <div className="mt-auto flex items-center space-x-4">
          <SignOutButton>
            <Button variant="ghost">
              <LogOut className="h-4 w-4" />
              <span>{text.pt.dashboard.sidebar.logout}</span>
            </Button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
