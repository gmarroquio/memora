"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

type DownloadButtonProps = {
  selectedPhotos: { url: string; name: string }[];
};

export const DownloadButton = ({ selectedPhotos }: DownloadButtonProps) => {
  async function downloadFiles() {
    const zip = new JSZip();
    await Promise.all(
      selectedPhotos.map(async (photo) => {
        const img = await fetch(photo.url).then((r) => r.blob());
        const sufix = img.type.split("/").at(-1);

        zip.file(`${photo.name}.${sufix}`, img, { base64: true });
      })
    );

    const zipped = await zip.generateAsync({
      type: "blob",
    });
    saveAs(zipped, "photos");
  }

  return (
    <Button onClick={downloadFiles} disabled={selectedPhotos.length === 0}>
      <Download className="mr-2 h-4 w-4" /> Download Selected
    </Button>
  );
};

export const DownloadAllButton = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  async function downloadFiles() {
    setLoading(true);
    const response = await fetch(baseUrl({ path: `/api/medias?limit=false` }), {
      headers: { userId: userId! },
    });

    if (response.ok) {
      const body = await response.json();
      const selectedPhotos: { url: string; name: string }[] = body.medias;

      const zip = new JSZip();
      await Promise.all(
        selectedPhotos.map(async (photo) => {
          const img = await fetch(photo.url).then((r) => r.blob());
          const sufix = img.type.split("/").at(-1);

          zip.file(`${photo.name}.${sufix}`, img, { base64: true });
        })
      );

      const zipped = await zip.generateAsync({
        type: "blob",
      });
      saveAs(zipped, "photos");
    } else {
      toast.error("Can't download all photos now. Try again later");
    }
    setLoading(false);
  }

  return (
    <Button onClick={downloadFiles} disabled={loading}>
      <Download className="mr-2 h-4 w-4" /> Download All Photos
    </Button>
  );
};
