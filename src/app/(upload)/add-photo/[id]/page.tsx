"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";
import Image from "next/image";
import { baseUrl, cn } from "@/lib/utils";
import { getAnonUser } from "@/lib/anonUser";
import { useRouter } from "next/navigation";
import text from "./text.json";
import AddAnonUser from "./add-user";
import { ptBR } from "date-fns/locale";
import { addHours, formatDistanceToNowStrict } from "date-fns";
import { Footer } from "./footer";
import { toast } from "sonner";

// interface MediaAlbum extends Media {
//   uploaderId: string;
//   uploaderName: string;
// }

export type Album = {
  id: string;
  title: string;
  mediaCount: number;
  coverUrl: string;
  startDate: string;
  endDate: string;
  users: number;
  vintage: boolean;
  revealTime: "24h" | "12h" | "now" | "after";
  openGallery: boolean;
};

export type Uploader = { id: string; name: string };

export default function AddPhotoPage() {
  const path = usePathname();
  const code = path.split("/").at(-1);
  const [album, setAlbum] = useState<
    (Album & { limit: number; count: number }) | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [imageShow, setImageShow] = useState<MediaAlbum | null>(null);
  // const [capturedImage, setCapturedImage] = useState<File[] | null>(null);
  // const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<Uploader | undefined>(undefined);
  const [previews, setPreviews] = useState<{ url: string; key: string }[]>([
    { url: "/placeholder.svg", key: "1" },
    { url: "/placeholder.svg", key: "2" },
    { url: "/placeholder.svg", key: "3" },
    { url: "/placeholder.svg", key: "4" },
  ]);
  const router = useRouter();
  //const { startUpload } = useUploadThing("imageUploader");

  // const handleCapture = async (imageData: File) => {
  //   setImageShow(null);
  //   while (imageData.size > 4 * 1024 * 1024) {
  //     imageData = await convertImage(imageData, 0.9, 1, false);
  //   }
  //   const preview = await convertImage(imageData);
  //   setCapturedImage([imageData, preview]);
  //   if (imageData) setImagePreview(URL.createObjectURL(preview));
  // };

  // const cleanPhoto = () => {
  //   setImagePreview(null);
  //   setCapturedImage(null);
  //   setComment("");
  // };

  // const handleDeletePhoto = async () => {
  //   try {
  //     if (imageShow) {
  //       const response = await fetch(baseUrl(`/api/user/anon/media/`), {
  //         method: "DELETE",
  //         headers: { userId: user!.id },
  //         body: JSON.stringify({
  //           id: imageShow.id,
  //         }),
  //       });
  //       if (response.ok) {
  //         setImageShow(null);
  //       } else throw new Error();
  //     }
  //   } catch {
  //     toast.error(text.pt.error_deleting);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsUploading(true);
  //   setIsLoading(true);
  //   const user = getAnonUser();
  //   if (!capturedImage || !imagePreview || !user) return;

  //   try {
  //     if (capturedImage && album) {
  //       const image = await startUpload(capturedImage);
  //       if (image && image.length > 0) {
  //         const response = await fetch(baseUrl(`/api/albums/${album.id}/`), {
  //           method: "POST",
  //           body: JSON.stringify({
  //             url: image[0].ufsUrl,
  //             comment,
  //             uploader: user.id,
  //             utId: image[0].key,
  //             previewUrl: image[1].ufsUrl,
  //             previewKey: image[1].key,
  //           }),
  //         });
  //         if (response.ok) {
  //           await response.json();
  //           cleanPhoto();
  //         } else throw new Error();
  //       } else {
  //         throw new Error();
  //       }
  //     }
  //   } catch {
  //     toast.error(text.pt.error_uploading);
  //   }
  //   setIsUploading(false);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const storageUser = getAnonUser();
    if (storageUser) {
      setUser(storageUser);
    }
    fetch(baseUrl(`/api/code/${code}`)).then((resp) => {
      if (resp.ok) {
        resp.json().then((body) => {
          setAlbum(body);
          setIsLoading(false);
        });
      } else {
        router.push(`/add-photo/?toast=${text.pt.error_finding}`);
      }
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      fetch(baseUrl("/api/user/anon/media"), {
        headers: { userId: user.id },
      }).then((response) => {
        if (response.ok) {
        } else toast.error("Não foi possível carregar fotos");
      });
    }
    //eslint-disable-next-line
  }, [user]);

  console.log({ album });

  if (isLoading || !album) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen md:w-xl mx-auto pt-2 px-2 space-y-2">
      {album.coverUrl ? (
        <Image
          src={album.coverUrl}
          alt="Album cover"
          className="object-cover rounded-md"
          width={1000}
          height={250}
        />
      ) : (
        <div className="h-10" />
      )}
      <h1 className="text-2xl md:text-3xl text-center font-bold">
        {album.title}
      </h1>
      <div className="space-x-2 mx-auto flex justify-center items-center">
        <span className="text-gray-300">
          {album.users} convidado{album.users === 1 ? "" : "s"}
        </span>
        {album.revealTime !== "now" && (
          <>
            <div className="rounded-full bg-white h-1 w-1" />
            <span className="text-gray-300">
              fotos serão reveladas em{" "}
              {formatDistanceToNowStrict(
                addHours(
                  album.endDate,
                  album.revealTime === "12h"
                    ? 12
                    : album.revealTime === "24h"
                    ? 24
                    : 0
                ),
                { locale: ptBR }
              )}
            </span>
          </>
        )}
      </div>
      {!user ? (
        <AddAnonUser albumId={album.id} setUser={setUser} />
      ) : (
        <>
          {
            //TODO: add tab de pov e gallery
          }
          <div className="grid grid-cols-3 gap-3 pb-25">
            {previews.map((p) => (
              <div
                key={p.key}
                className="overflow-hidden rounded-md"
                onClick={() => console.log("modal de apagar foto", p.key)}
              >
                <img
                  src={p.url}
                  className={cn(
                    album.revealTime !== "now" && "blur",
                    "border border-white rounded-md h-32 w-full"
                  )}
                />
              </div>
            ))}
          </div>
          <Footer limit={27} taken={previews.length} />
        </>
      )}
    </div>
  );
}
