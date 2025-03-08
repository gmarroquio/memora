"use client";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
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
  const { userId } = useAuth();

  async function getStripeCheckout() {
    setLoading(true);
    const response = await fetch(baseUrl({ path: "/api/stripe" }), {
      headers: { userId: userId! },
    });

    if (response.ok) {
      const body = await response.json();
      setStripeCheckout(body.client_secret);
    } else {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  }
  useEffect(() => {
    getStripeCheckout();
  }, [getStripeCheckout]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: stripeCheckout }}>
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </Elements>
  );
}
