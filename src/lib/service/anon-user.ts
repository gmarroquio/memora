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
      else {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: (user) => {
      saveAnonUser(user);
      return user;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message ?? "Não foi possível criar usuário");
    },
  });
};
