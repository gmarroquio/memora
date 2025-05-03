import { useMutation, useQuery } from "@tanstack/react-query";
import { baseUrl } from "../utils";
import { useAuth } from "@clerk/nextjs";
import { getQueryClient } from "../query";
import { toast } from "sonner";

export const useGetCode = (albumId: string) => {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ["getQrCode", albumId],
    queryFn: async () => {
      const response = await fetch(baseUrl(`/api/albums/${albumId}/code`), {
        headers: { userId: userId! },
      });
      if (response.ok) return response.json();
      return [];
    },
  });
};

export const useGenerateCode = (albumId: string) => {
  const { userId } = useAuth();
  const client = getQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(baseUrl(`/api/albums/${albumId}/code`), {
        headers: { userId: userId! },
        method: "POST",
      });
      if (response.ok) return response.json();
      else throw new Error();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["getQrCode", albumId],
      });
    },
    onError: () => {
      toast.error("Erro ao criar qr code");
    },
  });
};
