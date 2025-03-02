"use client";

import type React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import CameraCapture from "@/components/camera";
import { useUploadThing } from "@/lib/uploadthing";
import { dataURLtoFile } from "@/lib/utils";
import Image from "next/image";

export default function AddPhotoPage() {
  const query = useSearchParams();
  const [albumCode, setAlbumCode] = useState(query.get("code") ?? "");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  //const router = useRouter();

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage || !albumCode) return;

    try {
      const image = dataURLtoFile(capturedImage, "photo");
      if (image) startUpload([image]);

      console.log("Uploading image to album with code:", albumCode);
      // router.push("/photo-added-success");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Photo to Wedding Album</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="albumCode">Album Code</Label>
          <Input
            id="albumCode"
            type="text"
            value={albumCode}
            onChange={(e) => setAlbumCode(e.target.value)}
            placeholder="Enter the album code"
            required
          />
        </div>

        <div>
          <Label>Capture Photo</Label>
          <CameraCapture onCapture={handleCapture} />
        </div>

        {capturedImage && (
          <div>
            <Label>Preview</Label>
            <Image
              src={capturedImage || "/placeholder.svg"}
              alt="Captured"
              className="mt-2 max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={!capturedImage || !albumCode || isUploading}
          className="w-full"
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
      </form>
    </div>
  );
}
