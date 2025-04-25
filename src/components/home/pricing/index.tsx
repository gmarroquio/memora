import text from "./text.json";
import { Guest } from "@/components/ui/pricing";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6 space-y-2">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              {text.pt.category}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {text.pt.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {text.pt.subtitle}
            </p>
          </div>
        </div>
        <div className="w-full grid">
          <Guest />
        </div>
      </div>
    </section>
  );
}
