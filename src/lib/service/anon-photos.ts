import { getQueryClient } from "@/lib/query";
import { baseUrl } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetAnonPhotos(
  userId: string,
  type: "all" | "guest",
  page = 1
) {
  return useQuery<{ url: string; key: string }[]>({
    queryKey: ["getPhoto", userId, type],
    queryFn: async () => {
      const res = await fetch(
        baseUrl(`/api/user/anon/media?page=${page}&all=${type === "all"}`),
        {
          headers: { userId: userId },
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        toast.error("Não foi possível carregar fotos");
      }
    },
  });
}

export function useUploadPhoto(userId: string) {
  const client = getQueryClient();

  return useMutation({
    mutationFn: async ({
      albumId,
      image,
    }: {
      albumId: string;
      image: { ufsUrl: string; key: string }[];
    }) => {
      const response = await fetch(baseUrl(`/api/albums/${albumId}/`), {
        method: "POST",
        body: JSON.stringify({
          url: image[0].ufsUrl,
          uploader: userId,
          utId: image[0].key,
          previewUrl: image[1].ufsUrl,
          previewKey: image[1].key,
        }),
      });
      if (!response.ok) throw new Error();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["getPhotos", userId, "all"],
      });
      client.invalidateQueries({
        queryKey: ["getPhotos", userId, "guest"],
      });
    },
    onError: () => {
      toast.error("Não foi possível adicionar foto");
    },
  });
}

export function useDeletePhoto(userId: string) {
  const client = getQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch(baseUrl(`/api/user/anon/media/`), {
        method: "DELETE",
        headers: { userId: userId },
        body: JSON.stringify({
          id: key,
        }),
      });
      if (!response.ok) throw new Error();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["getPhotos", userId, "all"],
      });
      client.invalidateQueries({
        queryKey: ["getPhotos", userId, "guest"],
      });
    },
    onError: () => {
      toast.error("Não foi possível deletar foto");
    },
  });
}
