import { Star } from "lucide-react";
import text from "./text.json";

export function Testimonials() {
  return (
    <section
      id="testimonials"
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
          {text.en.testimonials.map((testimonial, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
