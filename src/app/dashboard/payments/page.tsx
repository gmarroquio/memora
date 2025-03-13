"use client";
import { PaymentsHistory } from "@/components/dashboard/payments/payments";
import { StripeCheckout } from "@/components/dashboard/payments/stripe-checkout";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
        <StripeCheckout
          cleanCheckout={() => setStripeCheckout(undefined)}
          checkout={stripeCheckout}
        />
      ) : (
        <>
          {loading ? (
            <div className="h-40 w-full flex items-center justify-center">
              <Loader className="animate-spin h-10 w-10" />
            </div>
          ) : (
            <PaymentsHistory setPrice={setPrice} />
          )}
        </>
      )}
    </div>
  );
}
