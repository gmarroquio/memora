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
import { Eye } from "lucide-react";

// Mock data for albums
const mockAlbums = [
  {
    id: 1,
    name: "Wedding Day",
    photoCount: 150,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Engagement Party",
    photoCount: 75,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Honeymoon",
    photoCount: 200,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
];

export default function AlbumsList() {
  const [previewAlbum, setPreviewAlbum] = useState<
    (typeof mockAlbums)[0] | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAlbums.map((album) => (
          <Card key={album.id}>
            <CardHeader>
              <CardTitle>{album.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src={album.coverImage || "/placeholder.svg"}
                  alt={`Cover for ${album.name}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {album.photoCount} photos
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
            <DialogTitle>{previewAlbum?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={previewAlbum?.coverImage || "/placeholder.svg"}
                alt={`Preview of ${previewAlbum?.name}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p>{previewAlbum?.photoCount} photos in this album</p>
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
