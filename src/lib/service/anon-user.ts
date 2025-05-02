import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../utils";
import { toast } from "sonner";
import { saveAnonUser } from "@/lib/anonUser";

export const useCreateAnonUser = () => {
  return useMutation({
    mutationFn: async ({
      name,
      albumId,
    }: {
      name: string;
      albumId: string;
    }) => {
      const response = await fetch(baseUrl("/api/user/anon"), {
        method: "POST",
        body: JSON.stringify({
          name: name,
          albumId: albumId,
        }),
      });

      if (response.ok) return response.json();
    },
    onSuccess: (user) => {
      saveAnonUser(user);
      return user;
    },
    onError: () => {
      toast.error("Não foi possível criar usuário");
    },
  });
};
