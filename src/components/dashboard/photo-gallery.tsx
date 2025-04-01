"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader, Trash2 } from "lucide-react";
import { baseUrl } from "@/lib/utils";
import { Media } from "./album-photo-gallery";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Label } from "../ui/label";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PhotoGallery() {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoaded, userId } = useAuth();
  const [album, setAlbum] = useState<{ total: number; medias: Media[] }>({
    total: 0,
    medias: [],
  });

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(id)
        ? prev.filter((photoId) => photoId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(baseUrl({ path: `/api/medias/` }), {
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

  const handleDownload = () => {
    // In a real application, you would implement the download functionality here
    console.log("Downloading selected photos:", selectedPhotos);
  };

  const handleMorePhotos = async (page = 1) => {
    const resp = await fetch(baseUrl({ path: `/api/medias?page=${page}` }), {
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
      fetch(baseUrl({ path: `/api/medias?page=1` }), {
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
        <Button onClick={handleDownload} disabled={selectedPhotos.length === 0}>
          <Download className="mr-2 h-4 w-4" /> Download Selected
        </Button>
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
                  checked={selectedPhotos.includes(media.id)}
                  onCheckedChange={() => togglePhotoSelection(media.id)}
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
