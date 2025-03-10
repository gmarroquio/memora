"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader } from "lucide-react";
import { baseUrl } from "@/lib/utils";
import { Media } from "./album-photo-gallery";
import { useAuth } from "@clerk/nextjs";

export default function PhotoGallery() {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoaded, userId } = useAuth();
  const [medias, setMedias] = useState<Media[]>([]);

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

  useEffect(() => {
    if (userId && isLoaded)
      fetch(baseUrl({ path: `/api/medias/` }), {
        headers: { userId: userId! },
      }).then((resp) => {
        resp.json().then(setMedias);
        setIsLoading(false);
      });
  }, [userId, isLoaded]);

  if (isLoading && isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

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
        {medias.map((photo) => (
          <div key={photo.id} className="relative group">
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.comment || photo.url}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[300px]"
              priority
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
