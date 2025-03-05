"use client";

import { useEffect, useState } from "react";
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
import { Eye } from "lucide-react";
import { baseUrl } from "@/lib/utils";

export type Album = {
  id: string;
  title: string;
  mediaCount: number;
  coverUrl: string;
};

export default function AlbumsList() {
  const [previewAlbum, setPreviewAlbum] = useState<Album | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(baseUrl({ path: "/api/albums" }), {
      headers: { userId: "1" },
    }).then((response) => {
      if (response.ok) {
        response.json().then(setAlbums);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.length === 0 && (
          <>
            <span className="text-muted-foreground">
              You dont have any album
            </span>
          </>
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
                  width={309}
                  height={174}
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {album.mediaCount} photos
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setPreviewAlbum(album)}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
              <Button asChild>
                <Link href={`/dashboard/albums/${album.id}`}>View Album</Link>
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
            <p>{previewAlbum?.mediaCount} photos in this album</p>
            <Button asChild>
              <Link href={`/dashboard/albums/${previewAlbum?.id}`}>
                View Full Album
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
