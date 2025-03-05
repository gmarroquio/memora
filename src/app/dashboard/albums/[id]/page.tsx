import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumPhotoGallery from "@/components/dashboard/album-photo-gallery";
import Image from "next/image";
import { baseUrl } from "@/lib/utils";
import { headers } from "next/headers";

async function getAlbum(id: string) {
  const host = (await headers()).get("host");
  const response = await fetch(baseUrl({ path: `/api/albums/${id}`, host }), {
    headers: { userId: "1" },
  });
  if (response.ok) {
    return response.json();
  }
  return;
}

export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await _params;
  const album = await getAlbum(params.id);
  return {
    title: album ? `${album.title} Album` : "Album Not Found",
  };
}

export default async function AlbumPage({
  params: _params,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await _params;
  const album = await getAlbum(params.id);

  if (!album) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-2 mb-4">
        {album.coverUrl && (
          <>
            <Image
              src={album.coverUrl}
              alt="Album cover"
              className="hidden md:block object-cover"
              width={1000}
              height={300}
            />
          </>
        )}
        <h1 className="text-3xl font-bold">{album.title}</h1>
        <p className="text-muted-foreground">{album.medias.length} photos</p>
      </div>
      {album.medias.length === 0 && (
        <>
          <span className="text-muted-foreground">
            Album doesn&apos;t have any media yet
          </span>
        </>
      )}
      <AlbumPhotoGallery medias={album.medias} />
    </div>
  );
}
