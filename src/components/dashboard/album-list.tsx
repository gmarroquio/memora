"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Loader } from "lucide-react";
import text from "./text.json";
import { useGetAlbums } from "@/lib/service/album/get-albums";

export type Album = {
  id: string;
  title: string;
  mediaCount: number;
  coverUrl: string;
};

export default function AlbumsList() {
  const [previewAlbum, setPreviewAlbum] = useState<Album | null>(null);
  const { data: albums, isPending } = useGetAlbums();

  if (isPending || !albums) {
    return (
      <div className="h-40 flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.length === 0 && (
          <span className="text-muted-foreground">
            {text.pt.albums_list.no_albums}
          </span>
        )}
        {albums.map((album) => (
          <Card key={album.id}>
            <CardHeader>
              <CardTitle>{album.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src={album.coverUrl || "/placeholder.svg"}
                  alt={`Cover for ${album.title}`}
                  width={500}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {text.pt.albums_list.photos_count.replace(
                  "{count}",
                  album.mediaCount.toString()
                )}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setPreviewAlbum(album)}>
                <Eye className="mr-2 h-4 w-4" /> {text.pt.albums_list.preview}
              </Button>
              <Button asChild>
                <Link href={`/dashboard/albums/${album.id}`}>
                  {text.pt.albums_list.view_album}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!previewAlbum} onOpenChange={() => setPreviewAlbum(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{previewAlbum?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={previewAlbum?.coverUrl || "/placeholder.svg"}
                alt={`Preview of ${previewAlbum?.title}`}
                width={309}
                height={174}
                className="object-cover"
              />
            </div>
            <p>
              {text.pt.albums_list.photos_count.replace(
                "{count}",
                previewAlbum?.mediaCount.toString() || "0"
              )}
            </p>
            <Button asChild>
              <Link href={`/dashboard/albums/${previewAlbum?.id}`}>
                {text.pt.albums_list.view_album}
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
