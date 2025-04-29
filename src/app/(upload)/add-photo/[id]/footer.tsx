"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CameraButton } from "./camera";

export const Footer = ({ limit }: { limit: number; taken: number }) => {
  const [taken, setTaken] = useState(0);

  return (
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
        <CameraButton
          onClick={() => setTaken((old) => (old + 1) % (limit + 1))}
        />
        <div className="flex-1" />
      </div>
    </div>
  );
};
