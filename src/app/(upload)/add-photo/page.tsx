"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Heart } from "lucide-react";
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
import { useEffect, useRef } from "react";
import { baseUrl } from "@/lib/utils";
import text from "@/constants/texts.json";

const searchAlbum = z.object({
  code: z
    .string()
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

  useEffect(() => {
    if (code && buttonRef) {
      buttonRef.current?.click();
    }
  }, [buttonRef, code]);

  const handleSubmit = async (data: z.infer<typeof searchAlbum>) => {
    try {
      const response = await fetch(baseUrl({ path: `/api/code/${data.code}` }));
      if (response.ok) {
        const { code } = await response.json();
        router.push(`/add-photo/${code.albumId}`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Error searching for album");
    }
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-center p-2 md:p-4">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="md:h-9 md:w-9 text-primary" />
          <span className="md:text-4xl font-semibold tracking-tight">
            {text.pt.add_photo.header.title}
          </span>
        </Link>
      </header>
      <div className="py-4 md:w-lg mx-auto">
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
                  <FormLabel>
                    {text.pt.add_photo.form.album_code.label}
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} inputMode="text">
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={0}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={1}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={2}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={3}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={4}
                        />
                        <InputOTPSlot
                          className="h-12 w-12 text-3xl md:h-16 md:w-16 md:text-5xl"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    {text.pt.add_photo.form.album_code.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button ref={buttonRef} type="submit">
              <Camera />
              {text.pt.add_photo.form.button.label}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
