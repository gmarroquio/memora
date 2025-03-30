import { Star } from "lucide-react";
import Image from "next/image";
import text from "./text.json";

export function Preview() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              {text.en.category}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {text.en.title}
            </h2>
            <p className="text-muted-foreground md:text-xl">
              {text.en.subtitle}
            </p>
            <ul className="space-y-2">
              {text.en.bullet_points.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="relative rounded-2xl border bg-background p-2 shadow-xl">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="https://lsowtuhwxu.ufs.sh/f/JcBjQyIwDp03cR0ofbzB5QFlb6HxdtwGKU2pn7IfXsRyj9Tu"
                  width={400}
                  height={600}
                  alt="Party photo album app interface"
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
                &quot;{text.en.comment}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
