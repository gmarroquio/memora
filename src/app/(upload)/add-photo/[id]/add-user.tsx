import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form/inputs/input";
import { baseUrl } from "@/lib/utils";
import { toast } from "sonner";
import { saveAnonUser } from "@/lib/anonUser";
import { Uploader } from "./page";

const anonUser = z.object({
  name: z.string(),
});

type AnonUser = z.infer<typeof anonUser>;

export default function AddAnonUser({
  albumId,
  setUser,
}: {
  albumId: string;
  setUser: (user: Uploader) => void;
}) {
  const form = useForm<AnonUser>({
    resolver: zodResolver(anonUser),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AnonUser) => {
    const response = await fetch(baseUrl("/api/user/anon"), {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        albumId: albumId,
      }),
    });
    if (response.ok) {
      const user = await response.json();
      saveAnonUser(user);
      setUser(user);
    } else {
      toast.error("Não foi possível criar usuário");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-col flex items-center justify-center"
      >
        <InputForm name="name" label="" form={form} placeholder="Seu nome" />
        <Button type="submit">Ir para o album</Button>
      </form>
    </Form>
  );
}
