"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Heart,
  Users,
  Share2,
  Download,
  Lock,
  ChevronRight,
  Star,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "../components/sign/auth-modal";

export default function WeddingAlbumLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              WeddingSnap
            </span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex">
            <Button onClick={() => setIsAuthModalOpen(true)}>
              Get Started
            </Button>
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
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Capture Every Moment of Your Special Day
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Let your guests contribute to your wedding memories with our
                    collaborative photo album app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Create Your Album
                  </Button>
                  <Button size="lg" variant="outline">
                    See How It Works
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    width={600}
                    height={600}
                    alt="Wedding couple looking at photos on a smartphone"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background rounded-xl shadow-lg p-4 flex flex-col justify-center items-center">
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <p className="text-center text-sm font-medium">
                    Over 1 million wedding memories captured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need for Your Wedding Photos
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app makes it easy to collect, organize, and share all your
                  wedding photos in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Guest Contributions</h3>
                  <p className="text-muted-foreground">
                    Let your guests upload their photos directly to your album
                    with a simple link or QR code.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Easy Sharing</h3>
                  <p className="text-muted-foreground">
                    Share your album with friends and family who couldn't make
                    it to the celebration.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Download & Print</h3>
                  <p className="text-muted-foreground">
                    Download high-resolution photos for printing or create
                    custom photo books.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Private & Secure</h3>
                  <p className="text-muted-foreground">
                    Keep your memories private with password protection and
                    controlled access.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Favorites & Comments</h3>
                  <p className="text-muted-foreground">
                    Mark your favorite photos and leave comments to relive the
                    special moments.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Unlimited Storage</h3>
                  <p className="text-muted-foreground">
                    Store all your wedding photos without worrying about running
                    out of space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple Steps to Collect All Your Wedding Photos
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started is easy. Follow these simple steps to create
                  your collaborative wedding album.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                  1
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Create Your Album</h3>
                  <p className="text-muted-foreground">
                    Sign up and create a personalized wedding album with your
                    names and wedding date.
                  </p>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground hidden lg:block" />
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                  2
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Share With Guests</h3>
                  <p className="text-muted-foreground">
                    Share your unique album link or QR code with your wedding
                    guests through invitations or at the venue.
                  </p>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground hidden lg:block" />
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                  3
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Collect & Enjoy</h3>
                  <p className="text-muted-foreground">
                    Guests upload photos during and after the wedding, creating
                    a complete collection of memories.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create Your Album Now
              </Button>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  App Preview
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Beautiful, Intuitive, and Easy to Use
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our app is designed to be simple for guests of all ages. No
                  downloads required - just open the link and start uploading.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>No app download required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Works on any device</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Simple one-tap upload</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Real-time updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="relative rounded-2xl border bg-background p-2 shadow-xl">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=600&width=400"
                      width={400}
                      height={600}
                      alt="Wedding photo album app interface"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-background rounded-xl shadow-lg p-4 flex flex-col justify-center items-center">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-center text-sm font-medium">
                    "So easy to use! All our guests loved it!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Loved by Newlyweds
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what couples have to say about their experience with our
                  wedding photo album app.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "We got so many more photos than we would have with just our
                    photographer. Our guests captured moments we would have
                    missed!"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-1">
                    <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                  </div>
                  <div>
                    <p className="font-medium">Sarah & Michael</p>
                    <p className="text-sm text-muted-foreground">
                      Married June 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "So easy to set up! We included the QR code on our reception
                    tables and everyone loved adding their photos throughout the
                    night."
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-1">
                    <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                  </div>
                  <div>
                    <p className="font-medium">David & Emma</p>
                    <p className="text-sm text-muted-foreground">
                      Married August 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Our grandparents who couldn't travel for the wedding loved
                    being able to see all the photos in real-time. Best decision
                    we made!"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-1">
                    <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                  </div>
                  <div>
                    <p className="font-medium">Jessica & Thomas</p>
                    <p className="text-sm text-muted-foreground">
                      Married October 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan for your special day. No hidden fees
                  or surprises.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold">Basic</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="ml-1 text-muted-foreground">one-time</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Up to 500 photos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>6 months of storage</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Custom album link</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Download all photos</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-muted p-6 shadow-sm relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="ml-1 text-muted-foreground">one-time</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Unlimited photos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>1 year of storage</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Custom album link & QR code</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Download all photos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Photo editing tools</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold">Forever</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$149</span>
                    <span className="ml-1 text-muted-foreground">one-time</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Unlimited photos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Lifetime storage</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Custom album link & QR code</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Download all photos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Advanced photo editing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                      <span>Photo book creation</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Collecting Your Wedding Memories Today
                </h2>
                <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't miss a single moment from your special day. Create your
                  wedding album in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Create Your Album
                </Button>
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold tracking-tight">
                  WeddingSnap
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Capture, collect, and cherish every moment of your special day
                with our collaborative wedding photo album app.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Stay Updated</h4>
              <form className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} WeddingSnap. All rights
              reserved.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
