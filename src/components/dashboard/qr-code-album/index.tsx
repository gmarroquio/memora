"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, QrCodeIcon } from "lucide-react";
import { useGenerateCode, useGetCode } from "@/lib/service/qrcode";
import { CodeList } from "../guest-code-generator/code-list";

export default function QrCodeAlbum({ albumId }: { albumId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useGetCode(albumId);
  const { mutate, isPending: generating } = useGenerateCode(albumId);

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <QrCodeIcon className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-4 sm:max-w-xl max-h-10/12 md:max-h-11/12 overflow-auto">
        <DialogHeader>
          <DialogTitle>QR code</DialogTitle>
        </DialogHeader>
        <Button disabled={generating} onClick={() => mutate()}>
          <QrCodeIcon className="mr-2 h-4 w-4" />
          <span>Gerar novo QR Code</span>
        </Button>
        {isPending ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin h-10 w-10" />
          </div>
        ) : (
          <CodeList codes={data.codes} />
        )}
      </DialogContent>
    </Dialog>
  );
}
