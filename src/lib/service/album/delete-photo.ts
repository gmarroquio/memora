import { getQueryClient } from "@/lib/query";
import { baseUrl } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeletePhoto() {
  const { userId } = useAuth();
  const client = getQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(baseUrl(`/api/medias/`), {
        method: "DELETE",
        headers: { userId: userId! },
        body: JSON.stringify({
          id,
        }),
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getPhotos", userId] });
    },
    onError: () => {
      toast.error("Error deleting image");
    },
  });
}
