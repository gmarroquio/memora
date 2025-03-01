"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useScreen } from "usehooks-ts";

export const CameraComponent = () => {
  const [open, setOpen] = useState(false);
  const [cam, setCam] = useState("user");
  const screen = useScreen();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  function clearPhoto() {
    if (canvaRef && canvaRef.current && photoRef && photoRef.current) {
      const canvas = canvaRef.current;
      const context = canvas.getContext("2d")!;
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const data = canvas.toDataURL("image/png");
      photoRef.current.setAttribute("src", data);
    }
  }

  function takePicture() {
    if (canvaRef && canvaRef.current && photoRef && photoRef.current) {
      const canvas = canvaRef.current;
      const context = canvas.getContext("2d")!;
      if (screen.availWidth && (screen.availHeight ?? screen.height)) {
        canvas.width = screen.availWidth;
        canvas.height = screen.availHeight ?? screen.height;
        context.drawImage(
          videoRef.current!,
          0,
          0,
          screen.availWidth,
          screen.availHeight ?? screen.height
        );

        const data = canvas.toDataURL("image/png");
        photoRef.current.setAttribute("src", data);
      } else {
        clearPhoto();
      }
    }
    setOpen(false);
  }

  useEffect(() => {
    if (videoRef)
      if (navigator?.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: cam,
              width: { ideal: 4096 },
              height: { ideal: 2160 },
            },
            audio: false,
          })
          .then(function (stream) {
            if ("srcObject" in videoRef.current!) {
              videoRef.current.srcObject = stream;
            } else {
              // DEPRECATED
              videoRef.current!.src = URL.createObjectURL(
                stream as unknown as Blob
              );
            }
          })
          .catch(function () {
            console.log("Something went wrong!");
          });
      }
  }, [videoRef, cam, open]);

  return (
    <div className="flex flex-col items-center">
      <Button onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"} Cam
      </Button>
      <canvas className="sr-only" ref={canvaRef} id="canvas"></canvas>
      <div>
        <img
          ref={photoRef}
          id="photo"
          alt="The screen capture will appear in this box."
        />
      </div>
      {open && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-primary z-50">
          <div className="mx-auto">
            <div className="h-0 flex justify-end">
              <Button
                className="relative justify-self-end cursor-pointer z-50"
                onClick={() => setOpen(!open)}
              >
                {open ? "Close" : "Open"} Cam
              </Button>
            </div>
            <div className={cn("bg-[#666] w-full")}>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="-scale-x-100"
                id="videoElement"
              />
            </div>
            <div className="h-0 flex justify-between">
              <Button
                className="relative -top-9 z-50 cursor-pointer"
                onClick={takePicture}
              >
                Take Photo
              </Button>
              <Button
                className="relative -top-9 z-50 cursor-pointer"
                onClick={() => {
                  if (cam === "user") setCam("environment");
                  else setCam("user");
                }}
              >
                Change cam
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
