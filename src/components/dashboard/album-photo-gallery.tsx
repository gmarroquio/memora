"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for photos
const mockPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 1",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 2",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 3",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 4",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 5",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding photo 6",
  },
];

interface AlbumPhotoGalleryProps {
  albumId: string;
}

// eslint-disable-next-line
export default function AlbumPhotoGallery({ albumId }: AlbumPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof mockPhotos)[0] | null
  >(null);

  const handlePrevious = () => {
    const currentIndex = mockPhotos.findIndex(
      (photo) => photo.id === selectedPhoto?.id
    );
    if (currentIndex > 0) {
      setSelectedPhoto(mockPhotos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = mockPhotos.findIndex(
      (photo) => photo.id === selectedPhoto?.id
    );
    if (currentIndex < mockPhotos.length - 1) {
      setSelectedPhoto(mockPhotos[currentIndex + 1]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-3xl">
          <div className="relative aspect-video">
            <Image
              src={selectedPhoto?.src || "/placeholder.svg"}
              alt={selectedPhoto?.alt || "Selected photo"}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={selectedPhoto?.id === mockPhotos[0].id}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={
                selectedPhoto?.id === mockPhotos[mockPhotos.length - 1].id
              }
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
