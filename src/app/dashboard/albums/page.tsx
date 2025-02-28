import type { Metadata } from "next";
import AlbumsList from "@/components/dashboard/album-list";
import CreateAlbumButton from "@/components/dashboard/create-album-button";

export const metadata: Metadata = {
  title: "Albums",
};

export default function AlbumsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Albums</h1>
        <CreateAlbumButton />
      </div>
      <AlbumsList />
    </div>
  );
}
