import { Button } from "@/components/ui/button";
import text from "./text.json";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              {text.en.category}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {text.en.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {text.en.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {text.en.prices.map((price, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col justify-between rounded-lg border p-6 shadow-sm relative",
                price.name === "Premium" ? "bg-muted" : "bg-background"
              )}
            >
              {price.name === "Premium" && (
                <div className="absolute top-0 right-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  {text.en.most_popular}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{price.name}</h3>
                <div className="mt-4 flex items-baseline">
                  {price.price && (
                    <>
                      <span className="text-3xl font-bold">{`${price.currency}${price.price}`}</span>
                      <span className="ml-1 text-muted-foreground">
                        {text.en.one_time}
                      </span>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-4">
                  {price.perks.map((perk, perkIndex) => (
                    <li key={perkIndex} className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                      <span className="max-w-[236px]">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {price.id ? (
                <Link href={`/login?payments=${price.id}`}>
                  <Button className="mt-8 bg-primary hover:bg-primary/90">
                    {price.cta ?? text.en.cta}
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    disabled={price.disabled}
                    className="mt-8 bg-primary hover:bg-primary/90"
                  >
                    {price.cta ?? text.en.cta}
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
