"use client";

import { ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Camera } from "lucide-react";
import { renameFile } from "@/lib/utils";
import text from "./text.json";

interface CameraCaptureProps {
  onCapture: (imageData: File) => void;
  title?: string;
}

export default function CameraCapture({
  onCapture,
  title,
}: CameraCaptureProps) {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      const file: File = renameFile(e.target.files[0]);
      onCapture(file);
    }
  };

  return (
    <>
      <Button
        className="w-full h-10 md:h-8"
        type="button"
        onClick={() => {
          ref.current?.click();
        }}
      >
        <Camera className="mr-2 h-4 w-4" />
        {title ?? text.pt.button}
      </Button>
      <Input
        ref={ref}
        className="sr-only hidden"
        onChange={onChange}
        type="file"
        name="media"
        accept="image/*"
        capture="environment"
      />
    </>
  );
}
