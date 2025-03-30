"use client";
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
    description: "Perfect for events with up to 50 guests",
    features: [
      { name: "Up to 500 photos", included: true },
      { name: "$0.15 per additional photo", included: true },
      { name: "6 months of storage", included: true },
      { name: "Download all photos", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    id: "tier_2",
    name: "Premium",
    price: 99,
    description: "Perfect for events with up to 150 guests",
    features: [
      { name: "Up to 1500 photos", included: true },
      { name: "$0.10 per additional photo", included: true },
      { name: "1 year of storage", included: true },
      { name: "Download all photos", included: true },
      { name: "Priority support", included: true },
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
                Recommended
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">U${plan.price}</span>
                <span className="text-muted-foreground ml-1">once</span>
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
                Select {plan.name} plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
