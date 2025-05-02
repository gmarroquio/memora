"use client";
import { cn } from "@/lib/utils";
import { CameraButton } from "./camera";
import { convertImage } from "@/lib/image";
import { useUploadThing } from "@/lib/uploadthing";
import { renameFile } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnonUser } from "@/lib/anonUser";
import { useUploadPhoto } from "./fetch";

export const Footer = ({
  limit,
  taken,
  albumId,
}: {
  limit: number;
  taken: number;
  albumId: string;
}) => {
  const user = getAnonUser();
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [capture, setCapture] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate, isPending } = useUploadPhoto(user!.id);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      const file: File = renameFile(e.target.files[0]);
      handleCapture(file);
    }
  };

  const handleCapture = async (imageData: File) => {
    while (imageData.size > 4 * 1024 * 1024) {
      imageData = await convertImage(imageData, 0.9, 1, false);
    }
    const preview = await convertImage(imageData);
    setCapture([imageData, preview]);
    setPreview(URL.createObjectURL(imageData));
  };

  const cleanPhoto = () => {
    setPreview(null);
    setCapture([]);
  };

  const handleSubmit = async () => {
    if (capture.length === 2) {
      const image = await startUpload(capture);
      if (image && image.length > 0) {
        mutate({ albumId, image });
        cleanPhoto();
      } else {
        throw new Error();
      }
    }
  };

  if (isPending || isUploading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="fixed w-full h-0 bottom-20 left-0 right-0 px-2">
        <div className="flex bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 h-20 justify-between items-center rounded-full">
          <div className="flex-1 h-6 flex items-center overflow-clip">
            {Array.from({ length: limit + 1 }, (_, i) => i).map((info) => {
              const turn =
                360 * (info / (limit + 1)) + (taken + 1) * (360 / (limit + 1));
              return (
                <div
                  key={info}
                  className={cn(
                    `w-full text-2xl absolute transition-all pl-10 font-black`
                  )}
                  style={{
                    rotate: String(Math.floor(turn)) + "deg",
                    opacity: limit - taken === info ? "100%" : "0",
                  }}
                >
                  {info}
                </div>
              );
            })}
          </div>
          <CameraButton onClick={() => inputRef.current?.click()} />
          <div className="flex-1" />
        </div>
      </div>
      <input
        ref={inputRef}
        onChange={onChange}
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
      />
      {preview && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black flex flex-col justify-between px-4 py-10">
          <img src={preview} className="rounded-md" />

          <div className="grid grid-cols-3 items-center">
            <div className="col-start-2 flex justify-center">
              <CameraButton onClick={() => inputRef.current?.click()} />
            </div>
            <Button
              onClick={handleSubmit}
              className="col-start-3 font-bold justify-self-end text-xl p-5 border-2 border-white"
            >
              Usar foto
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
