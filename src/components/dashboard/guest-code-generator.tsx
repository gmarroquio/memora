"use client";

import { useState } from "react";
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

const guestCodeSchema = z.object({
  albumId: z.string({
    required_error: "Please select an album.",
  }),
  expirationDays: z.number().min(1).max(30),
});

// Mock data for albums
const mockAlbums = [
  { id: "1", name: "Wedding Day" },
  { id: "2", name: "Engagement Party" },
  { id: "3", name: "Honeymoon" },
];

export default function GuestCodeGenerator() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const form = useForm<z.infer<typeof guestCodeSchema>>({
    resolver: zodResolver(guestCodeSchema),
    defaultValues: {
      expirationDays: 7,
    },
  });

  function onSubmit(values: z.infer<typeof guestCodeSchema>) {
    // Here you would typically make an API call to generate the code
    console.log(values);
    // Simulating an API call
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedCode(code);
      setIsCopied(false);
      toast("Guest Code Generated", {
        description: `Your guest code is: ${code}`,
      });
    }, 1000);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Guest Code</CardTitle>
        <CardDescription>
          Create a code for guests to add photos to a specific album.
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
                  <FormLabel>Album</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an album" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAlbums.map((album) => (
                        <SelectItem key={album.id} value={album.id}>
                          {album.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the album you want guests to add photos to.
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
                  <FormLabel>Expiration (days)</FormLabel>
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
                    Set how many days the code will be valid for (1-30 days).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Generate Code</Button>
          </form>
        </Form>
        {generatedCode && (
          <div className="mt-4 p-4 bg-muted rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Generated Code:</p>
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
                Share this link with your guests:
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
