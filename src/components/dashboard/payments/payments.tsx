"use client";
import { baseUrl } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isBefore, addMonths } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import PaymentPlans from "./payment-plans";
import PaymentHistory from "./payment-history";

type PaymentHistoryProps = {
  setPrice: (price: string) => void;
};

export const PaymentsHistory = ({ setPrice }: PaymentHistoryProps) => {
  const [subscriptions, setSubscriptions] = useState<
    {
      id: number;
      name: string;
      buyDate: string;
      expirationTime: number;
    }[]
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      setLoading(true);
      fetch(baseUrl({ path: "/api/user/subscription" }), {
        headers: { userId: userId },
      }).then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setSubscriptions(body);
            setLoading(false);
          });
        } else {
          toast.error("Something went wrong!");
        }
      });
    }
  }, [isLoaded, userId]);

  if (loading) {
    return (
      <div className="h-40 w-full flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  if (
    subscriptions &&
    subscriptions.length > 0 &&
    isBefore(
      new Date(),
      addMonths(subscriptions[0].buyDate, subscriptions[0].expirationTime)
    )
  ) {
    return <PaymentHistory payments={subscriptions} />;
  }

  return <PaymentPlans setPlan={setPrice} />;
};
