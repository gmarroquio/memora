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

  useEffect(() => {
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
  }, []);

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
