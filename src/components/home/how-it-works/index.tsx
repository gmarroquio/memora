import text from "./text.json";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
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
          {text.en.steps.map((step, i) => (
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
          {
            //<Button
            //  size="lg"
            //  className="bg-primary hover:bg-primary/90"
            //>
            //  {text.en.home.how_it_works.cta}
            //</Button>
          }
        </div>
      </div>
    </section>
  );
}
