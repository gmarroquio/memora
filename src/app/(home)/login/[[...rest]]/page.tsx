"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignIn, SignUp } from "@clerk/nextjs";
import text from "./text.json";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const payments = searchParams.get("payments");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            {text.pt.title}
          </h1>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{text.pt.tabs.login}</TabsTrigger>
              <TabsTrigger value="signup">{text.pt.tabs.signup}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignIn
                fallbackRedirectUrl={
                  payments
                    ? `/dashboard/payments?payments=${payments}`
                    : "/dashboard"
                }
              />
            </TabsContent>
            <TabsContent value="signup">
              <SignUp
                fallbackRedirectUrl={
                  payments
                    ? `/dashboard/payments?payments=${payments}`
                    : "/dashboard"
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
