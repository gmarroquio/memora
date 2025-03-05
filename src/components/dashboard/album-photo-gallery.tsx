"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

type Media = { url: string; id: number; preview: string };

interface AlbumPhotoGalleryProps {
  medias: Media[];
}

export default function AlbumPhotoGallery({ medias }: AlbumPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Media | null>(null);

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
              src={photo.preview || "/placeholder.svg"}
              alt={photo.url + " preview"}
              width={309}
              height={174}
              className="object-cover rounded-md"
            />
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
            src={selectedPhoto?.url || "/placeholder.svg"}
            alt={"Selected photo"}
            width={400}
            height={400}
            className="object-contain mx-auto"
          />
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={selectedPhoto?.id === medias.at(0)?.id}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
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
