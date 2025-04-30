"use client";
import { Camera } from "lucide-react";

export const CameraButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-primary hover:bg-primary/80 p-2 border-white z-50 rounded-full border-2"
      >
        <Camera className="h-10 w-10" />
      </button>
    </>
  );
};
