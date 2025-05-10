"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { renameFile } from "@/lib/utils";
import { toast } from "sonner";
import text from "./text.json";
import { addHours, subDays } from "date-fns";
import { SwitchForm } from "@/components/form/inputs/switch";
import { CalendarForm } from "@/components/form/inputs/calendar";
import { InputForm } from "@/components/form/inputs/input";
import { SelectForm } from "@/components/form/inputs/select";
import { FileForm } from "@/components/form/inputs/image";
import { useCreateAlbum } from "@/lib/service/album/create-album";
import { useRouter } from "next/navigation";

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
    .max(15, "Album name must be 15 characters or less"),
  guests: z.enum(["tier_1", "tier_2", "tier_3", "tier_4", "tier_5"]),
  startDate: z.date(),
  endDate: z.date(),
  vintage: z.boolean(),
  revealTime: z.enum(["now", "after", "12h", "24h"]),
  openGallery: z.boolean(),
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const { mutateAsync, isPending } = useCreateAlbum();

  const form = useForm<CreateAlbumFormValues>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      name: "",
      coverImage: undefined,
      guests: "tier_1",
      startDate: new Date(),
      endDate: addHours(new Date(), 8),
      vintage: true,
      revealTime: "after",
      openGallery: false,
    },
  });

  const onSubmit = async (data: CreateAlbumFormValues) => {
    try {
      const body: Record<string, undefined | string | boolean> = {
        title: data.name,
        guests: data.guests,
        startDate: data.endDate.toISOString(),
        endDate: data.endDate.toISOString(),
        vintage: data.vintage,
        revealTime: data.revealTime,
        openGallery: data.openGallery,
        coverUrl: undefined,
      };
      if (data.coverImage) {
        const coverUpload = await startUpload([
          renameFile(data.coverImage, data.name.replaceAll(" ", "_")),
        ]);
        if (!coverUpload) throw new Error();
        body.coverUrl = coverUpload[0].ufsUrl;
      }

      const { url } = await mutateAsync(body);
      router.push(url);
    } catch (e) {
      console.log(e);
      toast.error("Error creating album");
    }
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">
            {text.pt.create_album.button.create}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-10/12 md:max-h-11/12 overflow-auto">
        <DialogHeader>
          <DialogTitle>{text.pt.create_album.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6 items-center"
          >
            <InputForm
              name="name"
              label="Nome do Álbum"
              form={form}
              placeholder="Digite o nome do album"
            />
            <CalendarForm
              form={form}
              name="startDate"
              label="Início"
              disable={(date) => date < subDays(new Date(), 1)}
            />
            <CalendarForm
              form={form}
              name="endDate"
              label="Fim"
              disable={(date) =>
                date < new Date() || date < form.watch("startDate")
              }
            />
            <SelectForm
              name="guests"
              form={form}
              label="Convidados"
              placeholder="convidados"
              options={[
                { value: "tier_1", label: "10 convidado" },
                { value: "tier_2", label: "25 convidado" },
                { value: "tier_3", label: "50 convidado" },
                { value: "tier_4", label: "100 convidado" },
                { value: "tier_5", label: "150 convidado" },
              ]}
            />
            <SwitchForm
              form={form}
              label="Abrir Galeria"
              name="openGallery"
              message={{
                on: "Galeria disponível em tempo real",
                off: "Galeria disponível só após revelar",
              }}
            />
            <SwitchForm
              form={form}
              label="Efeito Analógico"
              name="vintage"
              message={{
                on: "Fotos com efeito analógico",
                off: "Fotos sem efeitos",
              }}
            />
            <SelectForm
              name="revealTime"
              form={form}
              label="Quando será revelado"
              placeholder="tempo"
              options={[
                { value: "now", label: "Instantâneo" },
                { value: "after", label: "Após a festa" },
                { value: "12h", label: "12 horas após a festa" },
                { value: "24h", label: "24 horas após a festa" },
              ]}
            />
            <FileForm
              form={form}
              name="coverImage"
              label="Imagem de capa"
              description="Envie uma imagem de capa para seu álbum (opcional)"
            />
            <Button type="submit" disabled={isUploading || isPending}>
              {text.pt.create_album.button.create}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
