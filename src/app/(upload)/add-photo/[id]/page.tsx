"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";
import Image from "next/image";
import { baseUrl } from "@/lib/utils";
import { getAnonUser } from "@/lib/anonUser";
import { useRouter } from "next/navigation";
import text from "./text.json";
import AddAnonUser from "./add-user";
import { ptBR } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";
import { Footer } from "./footer";

// interface MediaAlbum extends Media {
//   uploaderId: string;
//   uploaderName: string;
// }

export type Album = {
  id: string;
  title: string;
  mediaCount: number;
  coverUrl: string;
  endDate: string;
  users: number;
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

  if (isLoading || !album) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="w-full md:w-xl mx-auto pt-2 px-2 space-y-2 flex-1 flex flex-col">
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
        <span className="text-gray-300">{album.users} convidados</span>
        <div className="rounded-full bg-white h-1 w-1" />
        <span className="text-gray-300">
          termina em{" "}
          {formatDistanceToNowStrict(album.endDate, { locale: ptBR })}
        </span>
      </div>
      {!user ? (
        <AddAnonUser albumId={album.id} setUser={setUser} />
      ) : (
        <div className="flex flex-col flex-1">
          <div className="flex-1">Feed</div>
          <Footer limit={27} taken={4} />
        </div>
      )}
    </div>
  );
}

//           {imagePreview && (
//             <>
//               <Image
//                 src={imagePreview || "/placeholder.svg"}
//                 alt="Captured"
//                 className="hidden md:block mx-auto w-auto rounded-lg object-cover"
//                 width={500}
//                 height={500}
//               />
//               <Image
//                 src={imagePreview || "/placeholder.svg"}
//                 alt="Captured"
//                 className="md:hidden mx-auto w-auto rounded-lg object-cover"
//                 width={500}
//                 height={450}
//               />
//               <Input
//                 placeholder={text.pt.subtitle}
//                 defaultValue={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//
//               <div className="flex space-x-2">
//                 <Button
//                   disabled={!capturedImage || isUploading}
//                   className="w-full"
//                   onClick={cleanPhoto}
//                   variant="destructive"
//                 >
//                   {text.pt.delete}
//                 </Button>
//                 <CameraCapture
//                   title={text.pt.new_photo}
//                   onCapture={handleCapture}
//                 />
//               </div>
//               <Button
//                 disabled={
//                   !capturedImage ||
//                   isUploading ||
//                   Number(album?.count) >= Number(album?.limit)
//                 }
//                 className="w-full"
//                 onClick={handleSubmit}
//               >
//                 {Number(album?.count) >= Number(album?.limit) ? (
//                   <span>{text.pt.limit}</span>
//                 ) : (
//                   <>
//                     {isUploading ? (
//                       <>
//                         <Upload className="mr-2 h-4 w-4" />
//                         {text.pt.uploading}
//                       </>
//                     ) : (
//                       <>
//                         <Camera className="mr-2 h-4 w-4" />
//                         {text.pt.add_photo}
//                       </>
//                     )}
//                   </>
//                 )}
//               </Button>
//             </>
//           )}
//
//           {imageShow && (
//             <>
//               <Button size="icon" onClick={() => setImageShow(null)}>
//                 <ChevronLeft />
//               </Button>
//               <Image
//                 src={imageShow.previe
