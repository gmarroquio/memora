"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "@/lib/utils";
import text from "./text.json";
import { Logo } from "@/components/logo";

const searchAlbum = z.object({
  code: z
    .string()
    .toUpperCase()
    .min(6, "Album name must be 6 characters")
    .max(6, "Album name must be 6 characters"),
});

type SearchAlbum = z.infer<typeof searchAlbum>;

export default function Page() {
  const searchParams = useSearchParams();
  const toastMessage = searchParams.get("toast");
  const code = searchParams.get("code");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<SearchAlbum>({
    resolver: zodResolver(searchAlbum),
    defaultValues: {
      code: code ?? "",
    },
  });

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
  }, [toastMessage]);

  const handleSubmit = async (data: z.infer<typeof searchAlbum>) => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl(`/api/code/${data.code}`));
      if (response.ok) {
        router.push(`/add-photo/${data.code}`);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch {
      toast.error(text.pt.error);
      setLoading(false);
    }
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-center p-2 md:p-4">
        <Link href="/" className="flex items-center">
          <Logo size={0.05} />
        </Link>
      </header>
      <div className="mt-10 md:mt-0 py-4 md:w-lg mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 flex-col flex items-center justify-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.pt.form.album_code.label}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} inputMode="text">
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={0}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={1}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={2}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={3}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={4}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl uppercase"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    {text.pt.form.album_code.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button ref={buttonRef} type="submit" disabled={loading}>
              <Camera />
              {text.pt.form.button.label}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
