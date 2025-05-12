import { cn } from "@/lib/utils";
import { useDeletePhoto, useGetAnonPhotos } from "@/lib/service/anon-photos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Photo = ({
  src,
  imageKey,
  pending,
  reveal,
  userId,
}: {
  src: string;
  userId: string;
  imageKey: string;
  reveal: boolean;
  pending?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeletePhoto(userId);

  return (
    <>
      {open && (
        <div className="absolute top-100 bottom-100 left-10 right-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 flex items-center justify-center flex-col rounded-md space-y-2 text-black">
          {isPending ? (
            <Loader className="animate-spin h-10 w-10" />
          ) : (
            <>
              <span className="font-bold text-2xl">Deseja deletar foto?</span>
              <div className="space-x-2">
                <Button
                  className="text-xl px-8 py-4 font-bold text"
                  variant="destructive"
                  onClick={() => mutate(imageKey)}
                >
                  Deletar
                </Button>
                <Button
                  className="text-xl px-8 py-4 font-bold text"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      <div
        className={cn(pending && "animate-pulse", "overflow-hidden rounded-md")}
        onClick={() => setOpen(true)}
      >
        <img
          alt={"preview"}
          src={src}
          className={cn(
            !reveal && "blur",
            "rounded-md h-32 w-full object-cover"
          )}
        />
      </div>
    </>
  );
};

export const Gallery = ({
  reveal,
  type,
  userId,
}: {
  reveal: boolean;
  userId: string;
  type: "guest" | "all";
}) => {
  const { data } = useGetAnonPhotos(userId, type);
  return (
    <div className="grid grid-cols-3 gap-3 pb-25">
      {!data &&
        [
          { url: "/placeholder.svg", key: "1" },
          { url: "/placeholder.svg", key: "2" },
          { url: "/placeholder.svg", key: "3" },
        ].map((p) => (
          <Photo
            userId={userId}
            reveal={false}
            pending
            key={p.key}
            imageKey={p.key}
            src={p.url}
          />
        ))}
      {data?.map((p) => (
        <Photo
          reveal={reveal}
          key={p.key}
          imageKey={p.key}
          src={p.url}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default function Feed({
  reveal,
  gallery,
  userId,
}: {
  reveal: boolean;
  userId: string;
  gallery: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"gallery" | "pov">("pov");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "gallery" | "pov")}
    >
      <TabsList className={cn(gallery && "grid grid-cols-2", "w-full")}>
        <TabsTrigger className="w-full" value="pov">
          POV
        </TabsTrigger>
        {gallery && <TabsTrigger value="gallery">Galeria</TabsTrigger>}
      </TabsList>
      <TabsContent value="pov">
        <Gallery userId={userId} reveal={reveal} type="guest" />
      </TabsContent>
      <TabsContent value="gallery">
        <Gallery userId={userId} reveal={reveal} type="all" />
      </TabsContent>
    </Tabs>
  );
}
