import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import text from "./text.json";
import { baseUrl } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function getData() {
  const { userId } = await auth();

  const response = await fetch(baseUrl("/api/user/album"), {
    headers: {
      userId: userId!,
    },
  });
  if (response.ok) return response.json();
  else return undefined;
}

export default async function AccountSettings() {
  const album = await getData();

  return (
    <form
      action={async (form) => {
        "use server";
        const { userId } = await auth();
        await fetch(baseUrl("/api/user/album"), {
          method: "POST",
          headers: {
            userId: userId!,
          },
          body: JSON.stringify({ title: form.get("title") }),
        });
        revalidatePath("/dashboar/settings");
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{text.pt.settings.account_settings.title}</CardTitle>
          <CardDescription>
            {text.pt.settings.account_settings.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {text.pt.settings.account_settings.name.label}
            </Label>
            <Input
              name="title"
              id="title"
              defaultValue={album.title}
              placeholder={text.pt.settings.account_settings.name.placeholder}
            />
          </div>
          <Button>{text.pt.settings.account_settings.button.save}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
