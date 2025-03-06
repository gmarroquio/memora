"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { Album } from "./album-list";
import { baseUrl } from "@/lib/utils";
import text from "@/constants/texts.json"; // Adjust the import path accordingly

const guestCodeSchema = z.object({
  albumId: z.string({
    required_error: "Please select an album.",
  }),
  expirationDays: z.number().min(1).max(30),
});

export default function GuestCodeGenerator() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);

  const form = useForm<z.infer<typeof guestCodeSchema>>({
    resolver: zodResolver(guestCodeSchema),
    defaultValues: {
      expirationDays: 7,
    },
  });

  async function onSubmit(values: z.infer<typeof guestCodeSchema>) {
    try {
      setIsCopied(false);
      const response = await fetch(baseUrl({ path: `/api/code` }), {
        method: "POST",
        headers: { userId: "1" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const body = await response.json();
        setGeneratedCode(body.code);
        toast("Guest Code Generated", {
          description: `Your guest code is: ${body.code}`,
        });
      }
    } catch {
      toast.error("Error generating album code");
    }
  }

  const handleCopy = () => {
    if (generatedCode) {
      copy(generatedCode);
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "The guest code has been copied to your clipboard.",
      });
    }
  };

  useEffect(() => {
    fetch(baseUrl({ path: "/api/albums" }), {
      headers: { userId: "1" },
    }).then((response) => {
      if (response.ok) {
        response.json().then(setAlbums);
      }
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {text.pt.dashboard.settings.guest_code_generator.title}
        </CardTitle>
        <CardDescription>
          {text.pt.dashboard.settings.guest_code_generator.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="albumId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      text.pt.dashboard.settings.guest_code_generator.album
                        .label
                    }
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            text.pt.dashboard.settings.guest_code_generator
                              .album.placeholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {albums.map((album) => (
                        <SelectItem key={album.id} value={album.id}>
                          {album.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {
                      text.pt.dashboard.settings.guest_code_generator.album
                        .description
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      text.pt.dashboard.settings.guest_code_generator.expiration
                        .label
                    }
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
                    {
                      text.pt.dashboard.settings.guest_code_generator.expiration
                        .description
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {text.pt.dashboard.settings.guest_code_generator.generate_code}
            </Button>
          </form>
        </Form>
        {generatedCode && (
          <div className="mt-4 p-4 bg-muted rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {
                    text.pt.dashboard.settings.guest_code_generator
                      .generated_code
                  }
                </p>
                <p className="text-2xl font-bold">{generatedCode}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="ml-2"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
            <div>
              <p className="font-semibold mb-2">
                {text.pt.dashboard.settings.guest_code_generator.share_link}
              </p>
              <div className="flex gap-2">
                <Input value={`${window.location.origin}/add-photo`} readOnly />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    copy(`${window.location.origin}/add-photo`);
                    toast("Link copied", {
                      description:
                        "The photo upload link has been copied to your clipboard.",
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
