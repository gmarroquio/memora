"use client";

import { ChangeEvent, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Camera } from "lucide-react";
import { stringHash } from "@/lib/utils";

interface CameraCaptureProps {
  onCapture: (imageData: File[]) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      const files: File[] = [];
      for (const file of e.target.files) {
        const blob = file.slice(0, file.size, file.type);
        const newFile = new File(
          [blob],
          stringHash(file.name + new Date().toISOString()),
          {
            type: file.type,
          }
        );
        files.push(newFile);
      }
      onCapture(files);
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
        Capture
      </Button>
      <Input
        ref={ref}
        className="sr-only hidden"
        onChange={onChange}
        type="file"
        name="image"
        accept="image/*"
        capture="environment"
      />
    </>
  );
}
