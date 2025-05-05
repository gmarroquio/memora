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
  const [codes, setCodes] = useState<{ code: string; expiresAt: string }[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(baseUrl("/api/code"), {
        headers: { userId: userId! },
      }).then((response) => {
        response.json().then(setCodes);
      });
    }
  }, [userId]);

  const setGenerated = (code: string, expiresAt: string) => {
    setCodes((old) => [{ code, expiresAt }, ...old]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.pt.settings.guest_code_generator.title}</CardTitle>
        <CardDescription>
          {text.pt.settings.guest_code_generator.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeGeneratorForm setGeneratedCode={setGenerated} />
        <CodeList codes={codes} />
      </CardContent>
    </Card>
  );
}
