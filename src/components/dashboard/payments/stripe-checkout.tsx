"use client";
import { Button } from "@/components/ui/button";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

type StripeCheckoutProps = {
  cleanCheckout: () => void;
  checkout: string;
};

export function StripeCheckout({
  cleanCheckout,
  checkout,
}: StripeCheckoutProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Complete Your Purchase</h2>
        <Button variant="ghost" onClick={cleanCheckout}>
          Change Plan
        </Button>
      </div>

      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: checkout }}
      >
        <EmbeddedCheckout className="w-full" />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
