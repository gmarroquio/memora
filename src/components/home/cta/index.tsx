import { Button } from "@/components/ui/button";
import text from "./text.json";
import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {text.pt.title}
            </h2>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {text.pt.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
              >
                {text.pt.button}
              </Button>
            </Link>
            {
              //<Button
              //  size="lg"
              //  className="bg-background text-primary hover:bg-background/90"
              //>
              //  {text.pt.learn_more}
              //</Button>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
