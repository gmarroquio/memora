"use client";
import text from "./text.json";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const TabGuestTrigger: React.FC<{ guest: number }> = ({ guest }) => {
  return <TabsTrigger value={`${guest}`}>{guest} convidados</TabsTrigger>;
};

const TabGuestContent: React.FC<{ guest: number; price: number }> = ({
  guest,
  price,
}) => {
  return (
    <>
      <TabsContent value={`${guest}`}>
        <div className="flex items-center justify-between text-md">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <div>Até {guest} convidados</div>
          </div>
          <div>R${price}</div>
        </div>
        <Link prefetch href={`/login?payments=${guest}`}>
          <Button className="mt-8 bg-primary w-full hover:bg-primary/90">
            Criar album
          </Button>
        </Link>
      </TabsContent>
    </>
  );
};

export const Guest = () => {
  return (
    <>
      <Tabs defaultValue="10" className="mx-auto space-y-2">
        <TabsList>
          <TabGuestTrigger guest={10} />
          <TabGuestTrigger guest={25} />
          <TabGuestTrigger guest={50} />
          <TabGuestTrigger guest={100} />
          <TabGuestTrigger guest={150} />
        </TabsList>
        <div className="px-1 py-2 border-t border-gray-50/50">
          <TabGuestContent guest={10} price={9.99} />
          <TabGuestContent guest={25} price={19.99} />
          <TabGuestContent guest={50} price={39.99} />
          <TabGuestContent guest={100} price={69.99} />
          <TabGuestContent guest={150} price={99.99} />
        </div>
      </Tabs>
    </>
  );
};
