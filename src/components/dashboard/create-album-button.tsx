"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { baseUrl, renameFile } from "@/lib/utils";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "Album name is required")
    .max(50, "Album name must be 50 characters or less"),
  coverImage: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
});

type CreateAlbumFormValues = z.infer<typeof createAlbumSchema>;

export default function CreateAlbumButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<CreateAlbumFormValues>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      name: "",
      coverImage: undefined,
    },
  });

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

  const onSubmit = async (data: CreateAlbumFormValues) => {
    setLoading(true);
    try {
      let response;
      if (data.coverImage) {
        const coverUpload = await startUpload([
          renameFile(data.coverImage, data.name.replaceAll(" ", "_")),
        ]);
        if (!coverUpload) throw new Error();
        response = await fetch(baseUrl({ path: "/api/albums" }), {
          method: "POST",
          body: JSON.stringify({
            userId: 1,
            title: data.name,
            coverUrl: coverUpload[0].ufsUrl,
          }),
        });
      } else {
        response = await fetch(baseUrl({ path: "/api/albums" }), {
          method: "POST",
          body: JSON.stringify({
            userId: 1,
            title: data.name,
          }),
        });
      }
      if (response.ok) {
        const album = await response.json();
        router.push(`/dashboard/albums/${album.id}`);
      } else throw new Error();
    } catch {
      toast.error("Error creating album");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter album name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormDescription>
                    Upload a cover image for your album (optional)
                  </FormDescription>
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
                            <p className="text-sm font-medium">
                              Click to upload
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or WebP (max. 5MB)
                            </p>
                          </div>
                          <Button type="button" variant="secondary">
                            Select File
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
            <Button type="submit" disabled={isUploading || isLoading}>
              Create Album
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
