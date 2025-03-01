"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export const CameraComponent = () => {
  const [open, setOpen] = useState(false);
  const [cam, setCam] = useState("user");
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref)
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
            if ("srcObject" in ref.current!) {
              ref.current.srcObject = stream;
            } else {
              // DEPRECATED
              ref.current!.src = URL.createObjectURL(stream as unknown as Blob);
            }
          })
          .catch(function () {
            console.log("Something went wrong!");
          });
      }
  }, [ref, cam, open]);

  return (
    <div className="flex flex-col items-center">
      <Button onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"} Cam
      </Button>
      {open && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-primary z-50">
          <div className="mx-auto">
            <Button className="relative" onClick={() => setOpen(!open)}>
              {open ? "Close" : "Open"} Cam
            </Button>
            <video
              ref={ref}
              className="bg-[#666] scale-50"
              autoPlay
              muted
              playsInline
              id="videoElement"
            />
            <Button
              className="relative -top-9"
              onClick={() => {
                if (cam === "user") setCam("environment");
                else setCam("user");
              }}
            >
              Change cam
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
