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
import { useRouter } from "next/navigation";
import Link from "next/link";

const searchAlbum = z.object({
  code: z
    .string()
    .min(6, "Album name must be 6 characters")
    .max(6, "Album name must be 6 characters"),
});

type SearchAlbum = z.infer<typeof searchAlbum>;

export default function Page() {
  const router = useRouter();
  const form = useForm<SearchAlbum>({
    resolver: zodResolver(searchAlbum),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof searchAlbum>) => {
    try {
      console.log("Buscando por album:", data.code);
      console.log("Checa se existe");
      console.log("Valida expiration date");
      router.push(`/add-photo/${data.code}`);
    } catch (error) {
      toast.error("Error searching for album");
    }
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-center p-2 md:p-4">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="md:h-9 md:w-9 text-primary" />
          <span className="md:text-4xl font-semibold tracking-tight">
            WeddingSnap
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
                  <FormLabel>Album Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
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
                  <FormDescription>Please enter the album code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              <Camera />
              Go to Album
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
