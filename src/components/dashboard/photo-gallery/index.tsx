"use client";

import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import InfiniteScroll from "react-infinite-scroll-component";
import { DownloadAllButton, DownloadButton } from "./download-button";
import { useInfinitePhotos } from "@/lib/service/album";
import { DeleteButton } from "./delete-button";

export default function PhotoGallery() {
  const [selectedPhotos, setSelectedPhotos] = useState<
    { url: string; name: string }[]
  >([]);
  const { isLoaded } = useAuth();
  const { data, isLoading, isError, fetchNextPage } = useInfinitePhotos();

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

  if (isLoading && isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">Error</div>
    );
  }

  return (
    <>
      <div className="md:flex justify-between items-center mb-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          {selectedPhotos.length} photo(s) selected
        </p>
        <div className="space-x-2 grid grid-cols-2">
          <DownloadAllButton />
          <DownloadButton selectedPhotos={selectedPhotos} />
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-col max-h-11/12 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-gray-400"
      >
        <InfiniteScroll
          dataLength={data?.total ?? 0}
          next={fetchNextPage}
          hasMore={Number(data?.total) > (data?.medias.length ?? 0)}
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
          {data?.medias.length === 0 && (
            <span className="col-span-3 text-lg">No photos</span>
          )}
          {data?.medias.map((media) => (
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
              <DeleteButton id={media.id} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
