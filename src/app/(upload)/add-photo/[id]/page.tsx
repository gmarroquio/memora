"use client";
//Change to server????

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, ChevronLeft, Loader, Upload } from "lucide-react";
import CameraCapture from "@/components/camera";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";
import { baseUrl, cn } from "@/lib/utils";
import { Album } from "@/components/dashboard/album-list";
import { Input } from "@/components/ui/input";
import { Media } from "@/components/dashboard/album-photo-gallery";
import { Label } from "@/components/ui/label";
import { getAnonUser } from "@/lib/anonUser";
import { useRouter } from "next/navigation";
import { convertImage } from "@/lib/image";

interface MediaAlbum extends Media {
  uploaderId: string;
  uploaderName: string;
}

export default function AddPhotoPage() {
  const path = usePathname();
  const code = path.split("/").at(-1);
  const [album, setAlbum] = useState<
    (Album & { limit: number; count: number }) | null
  >(null);
  const [medias, setMedias] = useState<MediaAlbum[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageShow, setImageShow] = useState<MediaAlbum | null>(null);
  const [capturedImage, setCapturedImage] = useState<File[] | null>(null);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<{ id: string; name: string } | undefined>(
    undefined
  );
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const handleCapture = async (imageData: File) => {
    setImageShow(null);
    const preview = await convertImage(imageData);
    setCapturedImage([imageData, preview]);
    if (imageData) setImagePreview(URL.createObjectURL(preview));
  };

  const cleanPhoto = () => {
    setImagePreview(null);
    setCapturedImage(null);
    setComment("");
  };

  const handleDeletePhoto = async () => {
    try {
      if (imageShow) {
        const response = await fetch(
          baseUrl({ path: `/api/user/anon/media/` }),
          {
            method: "DELETE",
            headers: { userId: user!.id },
            body: JSON.stringify({
              id: imageShow.id,
            }),
          }
        );
        if (response.ok) {
          const newMedias = medias.filter((m) => m.id !== imageShow.id);
          setMedias(newMedias);
          setImageShow(null);
          toast("Photo deleted");
        } else throw new Error();
      }
    } catch {
      toast.error("Error uploading image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setIsLoading(true);
    const user = getAnonUser();
    if (!capturedImage || !imagePreview || !user) return;

    try {
      if (capturedImage && album) {
        const image = await startUpload(capturedImage);
        if (image && image.length > 0) {
          const response = await fetch(
            baseUrl({ path: `/api/albums/${album.id}/` }),
            {
              method: "POST",
              body: JSON.stringify({
                url: image[0].ufsUrl,
                comment,
                uploader: user.id,
                utId: image[0].key,
                previewUrl: image[1].ufsUrl,
                previewKey: image[1].key,
              }),
            }
          );
          if (response.ok) {
            const { medias, count } = await response.json();
            setMedias(medias);
            setAlbum({ ...album, count });
            cleanPhoto();
            toast("Upload Success");
          } else throw new Error();
        } else {
          throw new Error();
        }
      }
    } catch {
      toast.error("Error uploading image");
    }
    setIsUploading(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const storageUser = getAnonUser();
    if (!storageUser) {
      router.push(`/add-photo/?toast=Name is required&code=${code}`);
    }
    setUser(storageUser);
    fetch(baseUrl({ path: `/api/code/${code}` })).then((resp) => {
      if (resp.ok) {
        resp.json().then((body) => {
          setAlbum(body.album);
          setMedias(body.medias);
        });
        setIsLoading(false);
      } else {
        router.push(`/add-photo/?toast=Error finding album`);
      }
    });
  }, [code, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="w-full md:w-xl mx-auto pt-4 px-2 space-y-2 flex-1 flex flex-col">
      {album?.coverUrl && (
        <>
          <Image
            src={album.coverUrl}
            alt="Album cover"
            className="hidden md:block object-cover"
            width={1000}
            height={100}
          />
        </>
      )}
      <h1 className="text-2xl md:text-3xl font-bold">{album?.title}</h1>

      {!imagePreview && !imageShow && (
        <div className="flex flex-col justify-between flex-1 py-4 h-screen">
          <div className="grid grid-cols-3 gap-1 overflow-y-auto pb-12">
            {medias.map((media) => (
              <div
                key={media.id}
                className="overflow-x-hidden overflow-y-hidden space-y-1 cursor-pointer"
                onClick={() => setImageShow(media)}
              >
                <Image
                  alt={media.comment ?? media.url}
                  src={media.preview ?? media.url}
                  className="object-cover rounded-md md:hidden"
                  width={124}
                  height={124}
                  priority
                />
                <Image
                  alt={media.comment ?? media.url}
                  src={media.preview ?? media.url}
                  className="object-cover rounded-md hidden md:block"
                  width={180}
                  height={180}
                  priority
                />
                <Label className="font-bold">{media.comment}</Label>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "flex p-2 justify-center fixed bottom-0 right-0 left-0"
            )}
          >
            <CameraCapture onCapture={handleCapture} />
          </div>
        </div>
      )}

      {imagePreview && (
        <>
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Captured"
            className="hidden md:block mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={500}
          />
          <Image
            src={imagePreview || "/placeholder.svg"}
            alt="Captured"
            className="md:hidden mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={450}
          />
          <Input
            placeholder="Legenda (opcional)"
            defaultValue={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex space-x-2">
            <Button
              disabled={!capturedImage || isUploading}
              className="w-full"
              onClick={cleanPhoto}
              variant="destructive"
            >
              Apagar
            </Button>
            <CameraCapture title="Nova foto" onCapture={handleCapture} />
          </div>
          <Button
            disabled={
              !capturedImage ||
              isUploading ||
              Number(album?.count) >= Number(album?.limit)
            }
            className="w-full"
            onClick={handleSubmit}
          >
            {Number(album?.count) >= Number(album?.limit) ? (
              <span>Limite do album atingido</span>
            ) : (
              <>
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Adicionar foto ao Album
                  </>
                )}
              </>
            )}
          </Button>
        </>
      )}

      {imageShow && (
        <>
          <Button size="icon" onClick={() => setImageShow(null)}>
            <ChevronLeft />
          </Button>
          <Image
            src={imageShow.preview || imageShow.url || "/placeholder.svg"}
            alt="Captured"
            className="hidden md:block mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={500}
            priority
          />
          <Image
            src={imageShow.preview || imageShow.url || "/placeholder.svg"}
            alt="Captured"
            className="md:hidden mx-auto w-auto rounded-lg object-cover"
            width={500}
            height={450}
            priority
          />
          <Label className="text-lg">{imageShow.comment}</Label>

          <div className="flex space-x-2">
            <Button
              disabled={imageShow.uploaderId !== user!.id}
              className="w-full"
              onClick={handleDeletePhoto}
              variant="destructive"
            >
              Apagar
            </Button>
            <CameraCapture title="Nova foto" onCapture={handleCapture} />
          </div>
        </>
      )}
    </div>
  );
}
