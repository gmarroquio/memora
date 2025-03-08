"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { toast } from "sonner";

export type Media = {
  url: string;
  id: number;
  preview: string;
  comment: string;
};

interface AlbumPhotoGalleryProps {
  medias: Media[];
}

export default function AlbumPhotoGallery({ medias }: AlbumPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Media | null>(null);
  const selected = useRef<HTMLImageElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handlePrevious = () => {
    const currentIndex = medias.findIndex(
      (photo) => photo.id === selectedPhoto?.id
    );
    if (currentIndex > 0) {
      setSelectedPhoto(medias[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = medias.findIndex(
      (photo) => photo.id === selectedPhoto?.id
    );
    if (currentIndex < medias.length - 1) {
      setSelectedPhoto(medias[currentIndex + 1]);
    }
  };

  const downloadPhoto = useCallback(async () => {
    setDownloading(true);
    if (selectedPhoto) {
      const response = await fetch(selectedPhoto.url);
      if (!response.ok) {
        toast.error("Error downloading image");
        return;
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.download = "image.png";
      a.href = blobUrl;
      a.click();

      URL.revokeObjectURL(blobUrl);
    }
    setDownloading(false);
  }, [selectedPhoto]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {medias.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.url + " preview"}
              width={309}
              height={174}
              className="object-cover rounded-md"
            />
            <span>{photo.comment}</span>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogTitle>Photo</DialogTitle>
          <DialogDescription />
          <Image
            ref={selected}
            src={selectedPhoto?.url || "/placeholder.svg"}
            alt={"Selected photo"}
            width={400}
            height={400}
            className="object-contain mx-auto"
          />
          <span>{selectedPhoto?.comment}</span>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={selectedPhoto?.id === medias.at(0)?.id}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={downloadPhoto}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Downloading
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={selectedPhoto?.id === medias.at(-1)?.id}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
