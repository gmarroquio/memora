"use client";
import PaymentPlans from "@/components/dashboard/payment-plans";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Page() {
  const searchParams = useSearchParams();
  const payments = searchParams.get("payments");
  const [stripeCheckout, setStripeCheckout] = useState<string | undefined>(
    undefined
  );
  const [price, setPrice] = useState<string | null>(payments);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (price && isLoaded) {
      setLoading(true);
      fetch(baseUrl({ path: "/api/stripe" }), {
        headers: { userId: userId!, price },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((body) => {
              setStripeCheckout(body.client_secret);
            });
          } else {
            toast.error("Something went wrong!");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [price, isLoaded, userId]);

  if (!isLoaded) {
    return (
      <div className="h-40 w-full flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
      <p className="text-muted-foreground mb-8">
        Choose the perfect plan for your wedding photo collection
      </p>
      {stripeCheckout ? (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Complete Your Purchase</h2>
            <Button
              variant="ghost"
              onClick={() => setStripeCheckout(undefined)}
            >
              Change Plan
            </Button>
          </div>

          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: stripeCheckout }}
          >
            <EmbeddedCheckout className="w-full" />
          </EmbeddedCheckoutProvider>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="h-40 w-full flex items-center justify-center">
              <Loader className="animate-spin h-10 w-10" />
            </div>
          ) : (
            <PaymentPlans setPlan={setPrice} />
          )}
        </>
      )}
    </div>
  );
}
