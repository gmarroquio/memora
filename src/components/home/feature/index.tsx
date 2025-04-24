import text from "./text.json";
import { Camera, Heart, Users, Share2, Download, Lock } from "lucide-react";

export function Features() {
  const icons: Record<string, React.JSX.Element> = {
    Camera: <Camera className="h-6 w-6 text-primary" />,
    Heart: <Heart className="h-6 w-6 text-primary" />,
    Users: <Users className="h-6 w-6 text-primary" />,
    Share2: <Share2 className="h-6 w-6 text-primary" />,
    Download: <Download className="h-6 w-6 text-primary" />,
    Lock: <Lock className="h-6 w-6 text-primary" />,
  };
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6">
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
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {text.pt.features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {icons[feature.icon]}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
