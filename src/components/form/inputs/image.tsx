"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { FormInput } from "./types";
import { useRef, useState } from "react";

export const FileForm: React.FC<FormInput & { description: string }> = ({
  form,
  name,
  label,
  description,
}) => {
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCoverImage = () => {
    form.setValue("coverImage", undefined);
    setCoverImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="md:col-span-2">
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <div className="mt-2">
            {coverImagePreview ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                <Image
                  src={coverImagePreview || "/placeholder.svg"}
                  alt="Cover preview"
                  objectFit="cover"
                  height={500}
                  width={500}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={clearCoverImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Clique para enviar</p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG ou WebP (máx. 5MB)
                    </p>
                  </div>
                  <Button type="button" variant="secondary">
                    Selecionar arquivo
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
