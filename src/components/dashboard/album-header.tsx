import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AlbumHeaderProps {
  name: string;
  photoCount: number;
}

export default function AlbumHeader({ name, photoCount }: AlbumHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <Button variant="ghost" asChild className="mb-2">
          <Link href="/dashboard/albums">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Albums
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-muted-foreground">{photoCount} photos</p>
      </div>
      <Button>Download All</Button>
    </div>
  );
}
