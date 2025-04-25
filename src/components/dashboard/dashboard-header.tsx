"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlbumIcon, CogIcon, ImagesIcon, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import text from "./text.json";
import { useState } from "react";
import { Logo } from "../logo";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden p-2 flex items-center justify-start fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <span className="font-semibold text-xl text-center w-full">
          Dashboard
        </span>
      </div>
      <aside className="md:w-52 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="hidden md:flex flex-col py-8 px-4">
          <Link href="/" className="flex items-center">
            <Logo size={0.04} color="white" />
            <span className="text-xl font-semibold tracking-tight">emora</span>
          </Link>
          <nav className="flex flex-col space-y-4 lg:space-y-6 my-6">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname === "/dashboard"
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <ImagesIcon />
              <span>{text.pt.sidebar.nav.gallery}</span>
            </Link>
            <Link
              href="/dashboard/albums"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname.startsWith("/dashboard/albums")
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <AlbumIcon />
              <span>{text.pt.sidebar.nav.albums}</span>
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname === "/dashboard/settings"
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <CogIcon />
              <span>{text.pt.sidebar.nav.settings}</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SignOutButton>
              <Button variant="ghost">
                <LogOut className="h-4 w-4" />
                <span>{text.pt.sidebar.logout}</span>
              </Button>
            </SignOutButton>
          </div>
        </div>
      </aside>
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 z-30 overflow-auto p-8 shadow-md animate-in md:hidden bg-background">
          <nav className="flex flex-col space-y-4 lg:space-y-6 mt-6 mb-4">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname === "/dashboard"
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <ImagesIcon />
              <span>{text.pt.sidebar.nav.gallery}</span>
            </Link>
            <Link
              href="/dashboard/albums"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname.startsWith("/dashboard/albums")
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <AlbumIcon />
              <span>{text.pt.sidebar.nav.albums}</span>
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "text-sm font-medium transition-colors flex items-center space-x-2 hover:text-primary",
                pathname === "/dashboard/settings"
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              )}
            >
              <CogIcon />
              <span>{text.pt.sidebar.nav.settings}</span>
            </Link>
          </nav>
          <SignOutButton>
            <Button className="p-0">
              <LogOut className="h-4 w-4" />
              <span>{text.pt.sidebar.logout}</span>
            </Button>
          </SignOutButton>
        </div>
      )}
    </>
  );
}
