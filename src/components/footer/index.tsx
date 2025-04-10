import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import texts from "./text.json";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">
                Memora
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{texts.en.subtitle}</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">{texts.en.product.title}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary"
                >
                  {texts.en.product.links.features}
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary"
                >
                  {texts.en.product.links.how_it_works}
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary"
                >
                  {texts.en.product.links.pricing}
                </Link>
              </li>
              {
                //  <li>
                //    <Link
                //      href="#"
                //      className="text-muted-foreground hover:text-primary"
                //    >
                //      {texts.en.product.links.faq}
                //    </Link>
                //  </li>
              }
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">{texts.en.company.title}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  {texts.en.company.links.about}
                </Link>
              </li>
              {
                //<>
                //  <li>
                //    <Link
                //      href="/blog"
                //      className="text-muted-foreground hover:text-primary"
                //    >
                //      {texts.en.company.links.blog}
                //    </Link>
                //  </li>
                //  <li>
                //    <Link
                //      href="/contact"
                //      className="text-muted-foreground hover:text-primary"
                //    >
                //      {texts.en.company.links.contact}
                //    </Link>
                //  </li>
                //</>
              }
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">{texts.en.news.title}</h4>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {texts.en.news.subscribe}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              {texts.en.news.warning}
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Memora. All rights reserved.
          </p>
          {
            //            <div className="flex gap-4 mt-4 sm:mt-0">
            //              <Link
            //                href="#"
            //                className="text-muted-foreground hover:text-primary"
            //              >
            //                Privacy
            //              </Link>
            //              <Link
            //                href="#"
            //                className="text-muted-foreground hover:text-primary"
            //              >
            //                Terms
            //              </Link>
            //              <Link
            //                href="#"
            //                className="text-muted-foreground hover:text-primary"
            //              >
            //                Cookies
            //              </Link>
            //            </div>
          }
        </div>
      </div>
    </footer>
  );
};
