"use client";

import { baseUrl } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetch(baseUrl({ path: "/api/user" }), {
        method: "POST",
        body: JSON.stringify({
          name: user.fullName,
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          phoneNumber: user.phoneNumbers?.at(0),
        }),
      }).then((response) => {
        if (response.ok) redirect(baseUrl({ path: "/dashboard" }));
        else toast.error("Não foi possível terminar seu cadastro");
      });
    }
  }, [isLoaded]);

  return (
    <div className="grid items-center justify-center p-10 h-[50vh]">
      <Loader className="animate-spin h-10 w-10" />
    </div>
  );
}
