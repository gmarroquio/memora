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
      <header className="hidden sm:block sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              {text.pt.features}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.how_it_works}
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.testimonials}
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.price}
            </Link>
          </nav>

          <div className="hidden md:block">
            {
              //    <SignedIn>
              //      <Link prefetch href="/dashboard" className="hidden md:flex">
              //        <Button>{text.pt.dashboard}</Button>
              //      </Link>
              //    </SignedIn>
              //    <SignedOut>
              //      <Link prefetch href="/login" className="hidden md:flex">
              //        <Button>{text.pt.get_start}</Button>
              //      </Link>
              //    </SignedOut>
            }
          </div>
        </div>
      </header>

      {
        //MOBILE header
      }
      <header className="sm:hidden w-full fixed bottom-10 z-40 px-2">
        <div className="container flex h-16 items-center justify-between rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-gray-200/80">
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
              {text.pt.features}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.how_it_works}
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.testimonials}
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {text.pt.price}
            </Link>
          </nav>

          <div className="hidden md:block">
            {
              //    <SignedIn>
              //      <Link prefetch href="/dashboard" className="hidden md:flex">
              //        <Button>{text.pt.dashboard}</Button>
              //      </Link>
              //    </SignedIn>
              //    <SignedOut>
              //      <Link prefetch href="/login" className="hidden md:flex">
              //        <Button>{text.pt.get_start}</Button>
              //      </Link>
              //    </SignedOut>
            }
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
        <div className="fixed inset-0 top-0 z-30 grid h-screen grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background border-t">
          <div className="flex flex-col gap-6 p-4">
            <Link
              href="#features"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.features}
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.how_it_works}
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.testimonials}
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.pt.price}
            </Link>
            <SignedOut>
              <Link prefetch href="/login" className="flex flex-col gap-2 mt-4">
                <Button>{text.pt.get_start}</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                prefetch
                href="/dashboard"
                className="flex flex-col gap-2 mt-4"
              >
                <Button>{text.pt.dashboard}</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
};
