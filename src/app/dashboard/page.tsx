import type { Metadata } from "next";
import PhotoGallery from "@/components/dashboard/photo-gallery";
import text from "@/constants/texts.json";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {text.pt.dashboard.home.title}
      </h1>
      <PhotoGallery />
    </div>
  );
}
