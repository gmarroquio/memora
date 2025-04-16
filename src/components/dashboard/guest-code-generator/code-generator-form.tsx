"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import text from "../text.json";
import { baseUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";

const guestCodeSchema = z.object({
  expirationDays: z.number().min(1).max(30),
});

type CodeGeneratorFormProps = {
  setGeneratedCode: (code: string, expireAt: string) => void;
};

export const CodeGeneratorForm = ({
  setGeneratedCode,
}: CodeGeneratorFormProps) => {
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof guestCodeSchema>>({
    resolver: zodResolver(guestCodeSchema),
    defaultValues: {
      expirationDays: 7,
    },
  });

  async function onSubmit(values: z.infer<typeof guestCodeSchema>) {
    try {
      const response = await fetch(baseUrl(`/api/code`), {
        method: "POST",
        headers: { userId: userId! },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const body = await response.json();
        setGeneratedCode(
          body.code,
          addDays(new Date(), values.expirationDays).toISOString()
        );
        toast("Guest Code Generated", {
          description: `Your guest code is: ${body.code}`,
        });
      }
    } catch {
      toast.error("Error generating album code");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="expirationDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {text.en.settings.guest_code_generator.expiration.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormDescription>
                {text.en.settings.guest_code_generator.expiration.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {text.en.settings.guest_code_generator.generate_code}
        </Button>
      </form>
    </Form>
  );
};
