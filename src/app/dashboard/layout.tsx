import type React from "react";
import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | WeddingSnap",
    template: "%s | WeddingSnap Dashboard",
  },
  description: "Manage your wedding photos and albums",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
