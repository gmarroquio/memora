import {
  CTA,
  Features,
  Hero,
  HowItWorks,
  Preview,
  Pricing,
  Testimonials,
} from "@/components/home/";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <HowItWorks />
        <Preview />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
    </div>
  );
}
