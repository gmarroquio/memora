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
import text from "@/constants/texts.json";
import { baseUrl } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

async function getData() {
  const { userId } = await auth();
  const host = (await headers()).get("host");

  const response = await fetch(baseUrl({ host, path: "/api/user" }), {
    headers: {
      userId: userId!,
    },
  });
  if (response.ok) return response.json();
  else return undefined;
}

export default async function AccountSettings() {
  const user = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {text.pt.dashboard.settings.account_settings.title}
        </CardTitle>
        <CardDescription>
          {text.pt.dashboard.settings.account_settings.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            {text.pt.dashboard.settings.account_settings.name.label}
          </Label>
          <Input
            id="name"
            disabled
            defaultValue={user.name}
            placeholder={
              text.pt.dashboard.settings.account_settings.name.placeholder
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            {text.pt.dashboard.settings.account_settings.email.label}
          </Label>
          <Input
            id="email"
            type="email"
            disabled
            defaultValue={user.email}
            placeholder={
              text.pt.dashboard.settings.account_settings.email.placeholder
            }
          />
        </div>
        <Button disabled>
          {text.pt.dashboard.settings.account_settings.button.save}
        </Button>
      </CardContent>
    </Card>
  );
}
