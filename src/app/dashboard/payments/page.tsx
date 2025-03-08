"use client";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const stripePromise = loadStripe(
  "pk_test_51NWPkUE4vJuSIv12WyAp9V9PBvjTq2FKWdxjfchLcUARGaR78NGcEJ4FdwLrpCmlDPcbhtfcX1wQblxio1qKq33I00czMFFO26"
);

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [stripeCheckout, setStripeCheckout] = useState<string | undefined>(
    undefined
  );
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded)
      fetch(baseUrl({ path: "/api/stripe" }), {
        headers: { userId: userId! },
      }).then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setStripeCheckout(body.client_secret);
            setLoading(false);
          });
        } else {
          toast.error("Something went wrong!");
          setLoading(false);
        }
      });
    //eslint-disable-next-line
  }, [isLoaded]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex items-center justify-center w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: stripeCheckout }}
      >
        <EmbeddedCheckout className="w-full" />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
