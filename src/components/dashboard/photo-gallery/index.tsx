"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, Trash2 } from "lucide-react";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import InfiniteScroll from "react-infinite-scroll-component";
import { DownloadAllButton, DownloadButton } from "./download-button";

export type Media = {
  id: number;
  url: string;
  name: string;
  comment?: string;
};

export default function PhotoGallery() {
  const [selectedPhotos, setSelectedPhotos] = useState<
    { url: string; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoaded, userId } = useAuth();
  const [album, setAlbum] = useState<{ total: number; medias: Media[] }>({
    total: 0,
    medias: [],
  });

  const togglePhotoSelection = (photo: { url: string; name: string }) => {
    const index = selectedPhotos.findIndex((i) => i.url === photo.url);
    if (index >= 0) {
      setSelectedPhotos((prev) =>
        prev.filter((prevPhoto) => prevPhoto.url !== photo.url)
      );
    } else {
      setSelectedPhotos((prev) => [...prev, photo]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(baseUrl(`/api/medias/`), {
        method: "DELETE",
        headers: { userId: userId! },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.ok) {
        const newMedias = album.medias.filter((m) => m.id !== id);
        setAlbum((old) => ({ total: old.total - 1, medias: newMedias }));
      } else throw new Error();
    } catch {
      toast.error("Error deleting image");
    }
  };

  const handleMorePhotos = async (page = 1) => {
    const resp = await fetch(baseUrl(`/api/medias?page=${page}`), {
      headers: { userId: userId! },
    });
    if (resp.ok) {
      resp.json().then((body) => {
        setAlbum((old) => ({
          total: old.total,
          medias: old.medias.concat(body.medias),
        }));
      });
      setIsLoading(false);
    } else {
      toast.error("Error loading photos");
    }
  };

  useEffect(() => {
    if (userId && isLoaded)
      fetch(baseUrl(`/api/medias?page=1`), {
        headers: { userId: userId! },
      }).then((resp) => {
        resp.json().then(setAlbum);
        setIsLoading(false);
      });
  }, [userId, isLoaded]);

  if (isLoading && isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {selectedPhotos.length} photo(s) selected
        </p>
        <div className="space-x-2">
          <DownloadAllButton />
          <DownloadButton selectedPhotos={selectedPhotos} />
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-col max-h-11/12 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-gray-400"
      >
        <InfiniteScroll
          dataLength={album?.total ?? 0}
          next={() => {
            handleMorePhotos(Math.floor(album.medias.length / 10) + 1);
          }}
          hasMore={Number(album?.total) > album.medias.length}
          loader={
            <>
              <div className="animate-pulse bg-gray-200 rounded-md" />
              <div className="animate-pulse bg-gray-200 rounded-md" />
              <div className="animate-pulse bg-gray-200 rounded-md" />
            </>
          }
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ height: "unset", overflow: "unset" }}
          scrollableTarget="scrollableDiv"
        >
          {album.medias.length === 0 && (
            <span className="col-span-3 text-lg">No photos</span>
          )}
          {album.medias.map((media) => (
            <div key={media.id} className="relative group">
              <Image
                src={media.url || "/placeholder.svg"}
                alt={media.comment || media.url}
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-[300px]"
                priority
              />
              <Label className="font-bold">{media.comment}</Label>
              <div className="absolute top-2 left-2">
                <Checkbox
                  checked={
                    selectedPhotos.findIndex((i) => i.url === media.url) >= 0
                  }
                  onCheckedChange={() =>
                    togglePhotoSelection({ url: media.url, name: media.name })
                  }
                />
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(media.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
