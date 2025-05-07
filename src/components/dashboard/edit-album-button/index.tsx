"use client";

import { useEffect, useState } from "react";
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
import { CogIcon } from "lucide-react";
import { addHours, subDays } from "date-fns";
import { SwitchForm } from "@/components/form/inputs/switch";
import { CalendarForm } from "@/components/form/inputs/calendar";
import { InputForm } from "@/components/form/inputs/input";
import { SelectForm } from "@/components/form/inputs/select";
import { useUpdateAlbum } from "@/lib/service/album";
import { useGetAlbum } from "@/lib/service/album/get-album";

const editAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "Album name is required")
    .max(15, "Album name must be 15 characters or less"),
  startDate: z.date(),
  endDate: z.date(),
  vintage: z.boolean(),
  revealTime: z.enum(["now", "after", "12h", "24h"]),
  openGallery: z.boolean(),
});

type EditAlbumFormValues = z.infer<typeof editAlbumSchema>;

export default function EditAlbumButton({ albumId }: { albumId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { data, isPending: pendingAlbum } = useGetAlbum(albumId);
  const { mutate, isPending: pendingEdit } = useUpdateAlbum(albumId);

  const form = useForm<EditAlbumFormValues>({
    resolver: zodResolver(editAlbumSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: addHours(new Date(), 8),
      vintage: true,
      revealTime: "after",
      openGallery: false,
    },
  });

  //TODO: Not Implemented
  const onSubmit = async (data: EditAlbumFormValues) => {
    const body: Record<string, undefined | string | boolean> = {
      title: data.name,
      startDate: data.endDate.toISOString(),
      endDate: data.endDate.toISOString(),
      vintage: data.vintage,
      revealTime: data.revealTime,
      openGallery: data.openGallery,
    };
    mutate(body);
  };

  useEffect(() => {
    if (data) {
      form.setValue("name", data.title);
      form.setValue("startDate", new Date(data.startDate));
      form.setValue("endDate", new Date(data.endDate));
      form.setValue("vintage", data.vintage);
      form.setValue(
        "revealTime",
        data.revealTime as "now" | "after" | "12h" | "24h"
      );
      form.setValue("openGallery", data.openGallery);
    }
  }, [data, form]);

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CogIcon className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Editar album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-10/12 md:max-h-11/12 overflow-auto">
        <DialogHeader>
          <DialogTitle>Editar album</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6 items-center"
          >
            <InputForm
              disabled={!edit}
              name="name"
              label="Nome do Álbum"
              form={form}
              placeholder="Digite o nome do album"
            />
            <CalendarForm
              disabled={!edit}
              form={form}
              name="startDate"
              label="Início"
              disable={(date) => date < subDays(new Date(), 1)}
            />
            <CalendarForm
              disabled={!edit}
              form={form}
              name="endDate"
              label="Fim"
              disable={(date) =>
                date < new Date() || date < form.watch("startDate")
              }
            />
            <SwitchForm
              disabled={!edit}
              form={form}
              label="Abrir Galeria"
              name="openGallery"
              message={{
                on: "Galeria disponível em tempo real",
                off: "Galeria disponível só após revelar",
              }}
            />
            <SwitchForm
              disabled={!edit}
              form={form}
              label="Efeito Analógico"
              name="vintage"
              message={{
                on: "Fotos com efeito analógico",
                off: "Fotos sem efeitos",
              }}
            />
            <SelectForm
              disabled={!edit}
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
            {edit ? (
              <div className="flex space-x-2 w-full">
                <Button
                  className="w-full"
                  onClick={() => setEdit(false)}
                  disabled={pendingAlbum || pendingEdit}
                  variant="destructive"
                >
                  Cancelar
                </Button>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={pendingAlbum || pendingEdit}
                >
                  Salvar
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setEdit(true)}
                disabled={pendingAlbum || pendingEdit}
              >
                Editar
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
