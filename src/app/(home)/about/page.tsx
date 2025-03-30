import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import text from "./text.json";

export const metadata: Metadata = {
  title: "About Us | Memora",
  description:
    "Learn about the team behind Memora and our mission to capture every special moment.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">{text.en.title}</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {text.en.our_story.title}
          </h2>
          {text.en.our_story.content.map((paragraph, index) => (
            <p key={index} className="text-lg mb-4 text-balance">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Memora team"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {text.en.our_mission.title}
        </h2>
        <p className="text-lg text-center max-w-2xl mx-auto text-balance">
          {text.en.our_mission.content}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {text.en.features.map((feature, index) => (
          <div key={index} className="text-center">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-balance">{feature.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">{text.en.cta.title}</h2>
        <Button asChild size="lg">
          <Link href="/signup">{text.en.cta.button}</Link>
        </Button>
      </div>
    </div>
  );
}
