import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form/inputs/input";
import { Uploader } from "./page";
import { useCreateAnonUser } from "@/lib/service/anon-user";

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
  const { mutateAsync, isPending } = useCreateAnonUser();

  const form = useForm<AnonUser>({
    resolver: zodResolver(anonUser),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AnonUser) => {
    const user = await mutateAsync({ name: data.name, albumId });
    setUser(user);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-col flex items-center justify-center"
      >
        <InputForm name="name" label="" form={form} placeholder="Seu nome" />
        <Button disabled={isPending} type="submit">
          Ir para o album
        </Button>
      </form>
    </Form>
  );
}
