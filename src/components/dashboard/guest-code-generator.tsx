"use client";

import { useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { Copy, Check, Download } from "lucide-react";
import { baseUrl } from "@/lib/utils";
import text from "./text.json"; // Adjust the import path accordingly
import { useAuth } from "@clerk/nextjs";

const guestCodeSchema = z.object({
  expirationDays: z.number().min(1).max(30),
});

export default function GuestCodeGenerator() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const { userId } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        headers: { userId: userId! },
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

  function downloadStringAsFile(data: string, filename: string) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = data;
    a.click();
  }

  function onCanvasButtonClick(code: string) {
    const node = canvasRef.current;
    if (node == null) {
      return;
    }
    const dataURI = node.toDataURL("image/png");

    downloadStringAsFile(dataURI, `${code}-qrcode.png`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.en.settings.guest_code_generator.title}</CardTitle>
        <CardDescription>
          {text.en.settings.guest_code_generator.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                    {
                      text.en.settings.guest_code_generator.expiration
                        .description
                    }
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
        {generatedCode && (
          <div className="mt-4 p-4 bg-muted rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {text.en.settings.guest_code_generator.generated_code}
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
              <p className="font-semibold mb-2">QR Code</p>
              <div className="flex items-center justify-between">
                <QRCodeCanvas
                  ref={canvasRef}
                  size={256}
                  value={`${window.location.origin}/add-photo?code=${generatedCode}`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    onCanvasButtonClick(generatedCode);
                    toast("QR code downloaded", {
                      description: "The qr code was downloaded",
                    });
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">
                {text.en.settings.guest_code_generator.share_link}
              </p>
              <div className="flex gap-2">
                <Input
                  value={`${window.location.origin}/add-photo?code=${generatedCode}`}
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    copy(
                      `${window.location.origin}/add-photo?code=${generatedCode}`
                    );
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
