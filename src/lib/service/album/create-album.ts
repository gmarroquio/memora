import { getQueryClient } from "@/lib/query";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAlbum() {
  const { userId } = useAuth();
  const client = getQueryClient();

  return useMutation({
    mutationFn: async (body: Record<string, undefined | string | boolean>) => {
      const response = await fetch(baseUrl(`/api/albums`), {
        method: "POST",
        headers: { userId: userId! },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error();
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getAlbum", userId] });
    },
    onError: () => {
      toast.error("Error creating album query");
    },
  });
}
