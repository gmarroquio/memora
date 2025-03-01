import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumPhotoGallery from "@/components/dashboard/album-photo-gallery";

// This is a mock function to simulate fetching album data
// In a real application, you would fetch this data from your API
async function getAlbum(id: string) {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const albums = [
    { id: "1", name: "Wedding Day", photoCount: 150 },
    { id: "2", name: "Engagement Party", photoCount: 75 },
    { id: "3", name: "Honeymoon", photoCount: 200 },
  ];

  const album = albums.find((a) => a.id === id);
  if (!album) return null;

  return album;
}

export async function generateMetadata({
  params: _params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await _params;
  const album = await getAlbum(params.id);
  return {
    title: album ? `${album.name} Album` : "Album Not Found",
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
      <h1 className="text-3xl font-bold mb-2">{album.name}</h1>
      <p className="text-muted-foreground mb-6">{album.photoCount} photos</p>
      <AlbumPhotoGallery albumId={album.id} />
    </div>
  );
}
