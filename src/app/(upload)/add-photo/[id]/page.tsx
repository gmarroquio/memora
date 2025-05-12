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
import { addHours, formatDistanceToNowStrict, isAfter } from "date-fns";
import { Footer } from "./footer";
import Feed from "./feed";

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
  const [user, setUser] = useState<Uploader | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
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
    if (album) {
      const storageUser = getAnonUser(album.id);
      if (storageUser) {
        setUser(storageUser);
      }
    }
  }, [album]);

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
        {album.revealTime !== "now" && !isAfter(new Date(), album.endDate) && (
          <>
            <div className="rounded-full bg-white h-1 w-1" />
            <span className="text-gray-300">
              <span>fotos serão reveladas em </span>
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
          <Feed
            userId={user.id}
            gallery={album.openGallery || true}
            reveal={
              album.revealTime === "now" || isAfter(new Date(), album.endDate)
            }
          />
          <Footer limit={27} taken={4} albumId={album.id} />
        </>
      )}
    </div>
  );
}
