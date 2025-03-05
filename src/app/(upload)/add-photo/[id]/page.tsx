"use client";
//Change to server????

import type React from "react";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import CameraCapture from "@/components/camera";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";
import { baseUrl, cn } from "@/lib/utils";
import { Album } from "@/components/dashboard/album-list";

export default function AddPhotoPage() {
  const path = usePathname();
  const albumId = path.split("/").at(-1);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<File[] | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleCapture = (imageData: File[]) => {
    setCapturedImage(imageData);
    if (imageData) setImagePreview(URL.createObjectURL(imageData[0]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage || !imagePreview) return;

    try {
      if (capturedImage) {
        const image = await startUpload([capturedImage[0]]);
        if (image) {
          await fetch(baseUrl({ path: `/api/albums/${albumId}/` }), {
            method: "POST",
            body: JSON.stringify({ url: image[0].ufsUrl }),
          });
          setImagePreview(null);
          setCapturedImage(null);
        } else {
          throw new Error();
        }
      }
    } catch {
      toast.error("Error uploading image");
    }
  };

  useEffect(() => {
    fetch(baseUrl({ path: `/api/albums/${albumId}` })).then((resp) => {
      resp.json().then(setAlbum);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="md:w-xl mx-auto pt-4 px-4 space-y-2 flex-1 flex flex-col">
      {album?.coverUrl && (
        <>
          <Image
            src={album.coverUrl}
            alt="Album cover"
            className="hidden md:block object-cover"
            width={1000}
            height={100}
          />
        </>
      )}
      <h1 className="text-3xl text-center font-bold mb-6">{album?.title}</h1>

      <div
        className={cn(
          "flex items-center justify-center",
          !imagePreview && "flex-1"
        )}
      >
        <CameraCapture onCapture={handleCapture} />
      </div>

      {imagePreview && (
        <>
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Captured"
            className="hidden md:block mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={500}
          />
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Captured"
            className="md:hidden mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={450}
          />

          <Button
            disabled={!capturedImage || isUploading}
            className="w-full"
            onClick={handleSubmit}
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Add Photo to Album
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
