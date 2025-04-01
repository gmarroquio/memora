import type { Metadata } from "next";
import PhotoGallery from "@/components/dashboard/photo-gallery";
import text from "./text.json";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-6">{text.en.title}</h1>
      <PhotoGallery />
    </div>
  );
}
