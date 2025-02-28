"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";

// Mock data for photos
const mockPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 1",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 2",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 3",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 4",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 5",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=300",
    alt: "Wedding photo 6",
  },
];

export default function PhotoGallery() {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(id)
        ? prev.filter((photoId) => photoId !== id)
        : [...prev, id]
    );
  };

  const handleDownload = () => {
    // In a real application, you would implement the download functionality here
    console.log("Downloading selected photos:", selectedPhotos);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {selectedPhotos.length} photo(s) selected
        </p>
        <Button onClick={handleDownload} disabled={selectedPhotos.length === 0}>
          <Download className="mr-2 h-4 w-4" /> Download Selected
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPhotos.map((photo) => (
          <div key={photo.id} className="relative group">
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[300px]"
            />
            <div className="absolute top-2 left-2">
              <Checkbox
                checked={selectedPhotos.includes(photo.id)}
                onCheckedChange={() => togglePhotoSelection(photo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
