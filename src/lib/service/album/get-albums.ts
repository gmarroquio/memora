import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export type Album = {
  id: string;
  title: string;
  mediaCount: number;
  coverUrl: string;
};

export function useGetAlbums() {
  const { userId } = useAuth();

  return useQuery<Album[]>({
    queryKey: ["getAlbum", userId],
    queryFn: async () => {
      const res = await fetch(baseUrl(`/api/albums/`), {
        headers: { userId: userId! },
      });
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Cannot fetch albums");
      }
    },
  });
}
