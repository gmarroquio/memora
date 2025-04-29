"use client";
import { Camera } from "lucide-react";
import { useRef } from "react";

export const CameraButton = ({ onClick }: { onClick: () => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
            onClick();
          }
        }}
        className="bg-primary hover:bg-primary/80 p-2 border-white z-50 rounded-full border-2"
      >
        <Camera className="h-10 w-10" />
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
      />
    </>
  );
};
