import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | WeddingSnap",
  description:
    "Learn about the team behind WeddingSnap and our mission to capture every special moment.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">About WeddingSnap</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-4 text-balance">
            WeddingSnap was born from a simple idea: to make sure no precious
            moment goes uncaptured on your big day. Founded by a team of
            photographers and tech enthusiasts, we set out to create a platform
            that brings together the perspectives of all your guests, creating a
            comprehensive and heartwarming collection of memories.
          </p>
          <p className="text-lg text-balance">
            Since our launch in 2020, we've helped thousands of couples around
            the world collect, organize, and cherish their wedding photos in a
            whole new way.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="WeddingSnap team"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-center max-w-2xl mx-auto text-balance">
          At WeddingSnap, our mission is to ensure that every couple has a
          complete, beautiful, and easily accessible collection of their wedding
          memories. We believe in the power of shared experiences and the joy
          that comes from reliving those special moments through photos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Easy Collaboration</h3>
          <p className="text-balance">
            We make it simple for all your guests to contribute their photos in
            real-time.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Beautiful Organization</h3>
          <p className="text-balance">
            Your photos are automatically sorted and organized for easy browsing
            and sharing.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Lasting Memories</h3>
          <p className="text-balance">
            We ensure your precious moments are safely stored and easily
            accessible for years to come.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Capture Your Special Day?
        </h2>
        <Button asChild size="lg">
          <Link href="/signup">Get Started with WeddingSnap</Link>
        </Button>
      </div>
    </div>
  );
}
