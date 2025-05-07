import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Media } from "../album";
import { baseUrl } from "@/lib/utils";

export function useGetAlbum(albumId: string) {
  const { userId } = useAuth();

  return useQuery<{
    title: string;
    openGallery: boolean;
    startDate: string;
    endDate: string;
    revealTime: string;
    vintage: boolean;
    medias: Media[];
  }>({
    queryKey: ["getAlbum", userId, albumId],
    queryFn: async () => {
      const res = await fetch(baseUrl(`/api/albums/${albumId}`), {
        headers: { userId: userId! },
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Cannot fetch album");
      }
    },
  });
}
