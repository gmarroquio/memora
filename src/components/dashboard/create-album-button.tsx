"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";

const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "Album name is required")
    .max(50, "Album name must be 50 characters or less"),
});

type CreateAlbumFormValues = z.infer<typeof createAlbumSchema>;

export default function CreateAlbumButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CreateAlbumFormValues>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateAlbumFormValues) => {
    // Here you would typically make an API call to create a new album
    console.log("Creating new album:", data);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsOpen(false);
    // In a real application, you might redirect to the new album page
    router.push(`/dashboard/albums/1`);
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
            <Button type="submit">Create Album</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
