import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumPhotoGallery from "@/components/dashboard/album-photo-gallery";
import Image from "next/image";
import { baseUrl } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import EditAlbumButton from "@/components/dashboard/edit-album-button";

async function getAlbum(id: string) {
  const { userId } = await auth();
  const response = await fetch(baseUrl(`/api/albums/${id}`), {
    headers: { userId: userId! },
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
            <Image
              src={album.coverUrl}
              alt="Album cover"
              className="block md:hidden object-cover"
              width={500}
              height={150}
            />
          </>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{album.title}</h1>
            <p className="text-muted-foreground">{album.medias.length} fotos</p>
          </div>
          <EditAlbumButton albumId={album.id} />
        </div>
      </div>
      {album.medias.length === 0 && (
        <>
          <span className="text-muted-foreground">Album ainda sem fotos</span>
        </>
      )}
      <AlbumPhotoGallery medias={album.medias} />
    </div>
  );
}
