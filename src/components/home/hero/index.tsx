import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import text from "./text.json";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-bl from-primary to-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {text.pt.title}
              </h1>
              <p className="max-w-[600px] text-foreground md:text-xl">
                {text.pt.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link prefetch href="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {text.pt.create_your_album}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://lsowtuhwxu.ufs.sh/f/JcBjQyIwDp03qmnEPduO3lFi7nRoqSwXyCA9PLEQ1TzhdtbY"
                width={600}
                height={600}
                alt="Friends in a party"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:-right-6 w-48 h-48 bg-background rounded-xl shadow-lg p-4 flex flex-col justify-center items-center">
              <Camera className="h-8 w-8 text-primary mb-2" />
              <p className="text-center text-sm font-medium">{text.pt.over}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
