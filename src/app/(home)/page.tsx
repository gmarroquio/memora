import { Button } from "@/components/ui/button";
import {
  Camera,
  Heart,
  Users,
  Share2,
  Download,
  Lock,
  Star,
} from "lucide-react";
import Image from "next/image";
import text from "@/constants/texts.json";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {text.pt.home.hero.title}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {text.pt.home.hero.subtitle}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    disabled
                  >
                    {text.pt.home.hero.create_your_album}
                  </Button>
                  <Button size="lg" variant="outline" disabled>
                    {text.pt.home.hero.see_how_it_works}
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
                    {text.pt.home.hero.over}
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
                  {text.pt.home.features.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {text.pt.home.features.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {text.pt.home.features.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[0].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[0].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[1].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[1].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[2].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[2].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[3].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[3].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[4].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[4].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {text.pt.home.features.features[5].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {text.pt.home.features.features[5].subtitle}
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
                  {text.pt.home.how_it_works.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {text.pt.home.how_it_works.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {text.pt.home.how_it_works.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {text.pt.home.how_it_works.steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center space-y-4 rounded-lg bg-background p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                    {i + 1}
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                disabled
              >
                {text.pt.home.how_it_works.cta}
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
                  {text.pt.home.app_preview.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {text.pt.home.app_preview.title}
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  {text.pt.home.app_preview.subtitle}
                </p>
                <ul className="space-y-2">
                  {text.pt.home.app_preview.bullet_points.map(
                    (point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{point}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="relative rounded-2xl border bg-background p-2 shadow-xl">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=600&width=400"
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
                    &quot;{text.pt.home.app_preview.comment}&quot;
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
                  {text.pt.home.testimonials.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {text.pt.home.testimonials.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {text.pt.home.testimonials.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {text.pt.home.testimonials.testimonials.map(
                (testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between space-y-4 rounded-lg bg-background p-6 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, star) => (
                          <Star
                            key={star}
                            className="h-5 w-5 text-primary fill-primary"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        &quot;{testimonial.comment}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.names}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
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
                  {text.pt.home.pricing.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {text.pt.home.pricing.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {text.pt.home.pricing.subtitle}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {text.pt.home.pricing.prices.map((price, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-between rounded-lg border ${
                    price.name === "Premium" ? "bg-muted" : "bg-background"
                  } p-6 shadow-sm relative`}
                >
                  {price.name === "Premium" && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {text.pt.home.pricing.most_popular}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">{price.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      {price.price && (
                        <>
                          <span className="text-3xl font-bold">{`${price.currency}${price.price}`}</span>
                          <span className="ml-1 text-muted-foreground">
                            {text.pt.home.pricing.one_time}
                          </span>
                        </>
                      )}
                    </div>
                    <ul className="mt-6 space-y-4">
                      {price.perks.map((perk, perkIndex) => (
                        <li key={perkIndex} className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {price.id ? (
                    <Link href={`/login?payments=${price.id}`}>
                      <Button className="mt-8 bg-primary hover:bg-primary/90">
                        {price.cta ?? text.pt.home.pricing.cta}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button
                        disabled={price.disabled}
                        className="mt-8 bg-primary hover:bg-primary/90"
                      >
                        {price.cta ?? text.pt.home.pricing.cta}
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {text.pt.home.cta.title}
                </h2>
                <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {text.pt.home.cta.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                  disabled
                >
                  {text.pt.home.cta.button}
                </Button>
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                  disabled
                >
                  {text.pt.home.cta.learn_more}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
