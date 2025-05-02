import type { Metadata } from "next";
import GuestCodeGenerator from "@/components/dashboard/guest-code-generator";
import AccountSettings from "@/components/dashboard/account-settings";
import text from "./text.json";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{text.pt.title}</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <AccountSettings />
      </div>
    </div>
  );
}
