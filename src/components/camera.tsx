"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }, [videoRef]);

  const stopCapture = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsCapturing(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        onCapture(imageData);
        stopCapture();
      }
    }
  }, [onCapture, stopCapture]);

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={cn(isCapturing ? "block" : "hidden", "w-full rounded-lg")}
      />
      {isCapturing ? (
        <>
          <div className="flex justify-center gap-4">
            <Button onClick={capturePhoto}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
            <Button variant="outline" onClick={stopCapture}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retake
            </Button>
          </div>
        </>
      ) : (
        <Button onClick={startCapture} className="w-full">
          <Camera className="mr-2 h-4 w-4" />
          Start Camera
        </Button>
      )}
      <canvas className="sr-only" ref={canvasRef} width="640" height="480" />
    </div>
  );
}
