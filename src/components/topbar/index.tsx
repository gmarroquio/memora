"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import text from "./text.json";
import { Logo } from "../logo";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={0.04} color="white" />
            <span className="text-xl font-semibold tracking-tight">emora</span>
            <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
              .party
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.en.features}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.en.how_it_works}
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.en.testimonials}
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.en.price}
            </Link>
          </nav>

          <div className="hidden md:block">
            <SignedIn>
              <Link href="/dashboard" className="hidden md:flex">
                <Button>{text.en.dashboard}</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/login" className="hidden md:flex">
                <Button>{text.en.get_start}</Button>
              </Link>
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
              {text.en.features}
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.en.how_it_works}
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.en.testimonials}
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.en.price}
            </Link>
            <SignedOut>
              <Link href="/login" className="flex flex-col gap-2 mt-4">
                <Button>{text.en.get_start}</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="flex flex-col gap-2 mt-4">
                <Button>{text.en.dashboard}</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
};
