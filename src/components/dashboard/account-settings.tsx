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
import text from "@/constants/texts.json"; // Adjust the import path accordingly

export default function AccountSettings() {
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
            defaultValue="John Doe"
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
            defaultValue="john@example.com"
            placeholder={
              text.pt.dashboard.settings.account_settings.email.placeholder
            }
          />
        </div>
        <Button>
          {text.pt.dashboard.settings.account_settings.button.save}
        </Button>
      </CardContent>
    </Card>
  );
}
