import { getQueryClient } from "@/lib/query";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type Media = {
  id: number;
  url: string;
  name: string;
  comment?: string;
};

export function useGetPhotos(page = 1) {
  const { userId } = useAuth();

  return useQuery<{ total: number; medias: Media[] }>({
    queryKey: ["getPhotos", userId],
    queryFn: async () => {
      const res = await fetch(baseUrl(`/api/medias?page=${page}`), {
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

export function useInfinitePhotos() {
  const { userId } = useAuth();

  return useInfiniteQuery<
    { total: number; medias: Media[] },
    Error,
    { total: number; medias: Media[] },
    string[],
    number
  >({
    queryKey: ["getPhotos", userId!],
    initialPageParam: 1,
    getNextPageParam: (last, pages) => {
      if (Math.ceil(last.total / 10) > pages.length) return pages.length + 1;
      return null;
    },
    select: (data) => {
      return {
        total: data.pages.at(0)?.total ?? 0,
        medias: data.pages.map((p) => p.medias).flat(),
      };
    },
    queryFn: async ({ pageParam }) => {
      const res = await fetch(baseUrl(`/api/medias?page=${pageParam}`), {
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

export function useUpdateAlbum(albumId: string) {
  const { userId } = useAuth();
  const client = getQueryClient();

  return useMutation({
    mutationFn: async (body: Record<string, undefined | string | boolean>) => {
      console.log("not implemented");
      const response = await fetch(baseUrl(`/api/albums/${albumId}`), {
        method: "POST",
        headers: { userId: userId! },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getAlbum", userId, albumId] });
    },
    onError: () => {
      toast.error("Error updating album");
    },
  });
}
