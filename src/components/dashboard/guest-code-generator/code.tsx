"use client";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

export const ShowQrCode = ({ code }: { code: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function downloadStringAsFile(data: string, filename: string) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = data;
    a.click();
  }

  function onCanvasButtonClick(code: string) {
    const node = canvasRef.current;
    if (node == null) {
      return;
    }
    const dataURI = node.toDataURL("image/png");

    downloadStringAsFile(dataURI, `${code}-qrcode.png`);
  }

  return (
    <>
      <div className="flex items-center justify-between sr-only">
        <QRCodeCanvas
          ref={canvasRef}
          size={256}
          value={`${window.location.origin}/add-photo?code=${code}`}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => {
          onCanvasButtonClick(code);
          toast("QR code downloaded", {
            description: "The qr code was downloaded",
          });
        }}
      >
        Download QR code
        <Download className="h-4 w-4" />
      </Button>
    </>
  );
};

export const AlbumLink = ({ code }: { code: string }) => {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(`${window.location.origin}/add-photo?code=${code}`);
    setIsCopied(true);
    toast("Copied to clipboard", {
      description: "Album link has been copied to your clipboard.",
    });
  };

  return (
    <>
      <Button variant="outline" onClick={handleCopy}>
        Copy album url
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};
