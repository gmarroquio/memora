"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import text from "@/constants/texts.json";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">Memora</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.top_bar.features}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.top_bar.how_it_works}
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.top_bar.testimonials}
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.top_bar.price}
            </Link>
          </nav>

          <div className="hidden md:block">
            <SignedIn>
              <Link href="/dashboard" className="hidden md:flex">
                <Button>{text.pt.top_bar.dashboard}</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Button disabled>{text.pt.top_bar.get_start}</Button>
              <Link href="/login" className="hidden md:flex"></Link>
            </SignedOut>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background border-t">
          <div className="flex flex-col gap-6 p-4">
            <Link
              href="#features"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.top_bar.features}
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.top_bar.how_it_works}
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.top_bar.testimonials}
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.top_bar.price}
            </Link>
            <SignedOut>
              <Link href="/login" className="flex flex-col gap-2 mt-4">
                <Button>{text.pt.top_bar.get_start}</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="flex flex-col gap-2 mt-4">
                <Button>{text.pt.top_bar.dashboard}</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
};
