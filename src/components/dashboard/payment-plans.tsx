"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

type PlanFeature = {
  name: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    id: "tier_1",
    name: "Basic",
    price: 49,
    description: "Perfeito para eventos com até 50 convidados",
    features: [
      { name: "Até 500 fotos", included: true },
      { name: "R$ 0.15 por foto adicional", included: true },
      { name: "6 meses de armazenamento", included: true },
      { name: "Baixe todas as fotos", included: true },
      { name: "Suporte prioritário", included: false },
    ],
  },
  {
    id: "tier_2",
    name: "Premium",
    price: 99,
    description: "Perfeito para eventos com até 150 convidados",
    features: [
      { name: "Até 1500 fotos", included: true },
      { name: "R$ 0.10 por foto adicional", included: true },
      { name: "1 ano de armazenamento", included: true },
      { name: "Baixe todas as fotos", included: true },
      { name: "Suporte prioritário", included: true },
    ],
    recommended: true,
  },
];

export default function PaymentPlans({
  setPlan,
}: {
  setPlan: (plan: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden ${
              plan.recommended ? "border-primary shadow-md" : ""
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                Recomendado
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">R${plan.price}</span>
                <span className="text-muted-foreground ml-1">uma vez</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <X className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setPlan(plan.id)}
                className="w-full"
                variant={plan.recommended ? "default" : "outline"}
              >
                Selecionar plano {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
