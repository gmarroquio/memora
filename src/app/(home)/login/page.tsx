"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/sign/login-form";
import SignUpForm from "@/components/sign/signup-form";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to WeddingSnap
          </h1>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
