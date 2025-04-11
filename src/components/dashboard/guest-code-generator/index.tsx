"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import text from "../text.json";
import { CodeGeneratorForm } from "./code-generator-form";
import { CodeList } from "./code-list";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

export default function GuestCodeGenerator() {
  const { userId } = useAuth();
  const [codes, setCodes] = useState<{ code: string; expireAt: string }[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(baseUrl({ path: "/api/code" }), {
        headers: { userId: userId! },
      }).then((response) => {
        response.json().then(setCodes);
      });
    }
  }, [userId]);

  const setGenerated = (code: string, expireAt: string) => {
    setCodes((old) => [{ code, expireAt }, ...old]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.en.settings.guest_code_generator.title}</CardTitle>
        <CardDescription>
          {text.en.settings.guest_code_generator.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeGeneratorForm setGeneratedCode={setGenerated} />
        <CodeList codes={codes} />
      </CardContent>
    </Card>
  );
}
