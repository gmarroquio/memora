import { cn } from "@/lib/utils";
import { useDeletePhoto, useGetAllPhotos, useGetAnonPhotos } from "./fetch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAnonUser } from "@/lib/anonUser";
import { Loader } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Photo = ({
  src,
  imageKey,
  pending,
  reveal,
}: {
  src: string;
  imageKey: string;
  reveal: boolean;
  pending?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const user = getAnonUser();
  const { mutate, isPending } = useDeletePhoto(user!.id);

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

export const POV = ({ reveal }: { reveal: boolean }) => {
  const user = getAnonUser();
  const { data } = useGetAnonPhotos(user!.id);
  return (
    <div className="grid grid-cols-3 gap-3 pb-25">
      {!data &&
        [
          { url: "/placeholder.svg", key: "1" },
          { url: "/placeholder.svg", key: "2" },
          { url: "/placeholder.svg", key: "3" },
        ].map((p) => (
          <Photo
            reveal={false}
            pending
            key={p.key}
            imageKey={p.key}
            src={p.url}
          />
        ))}
      {data?.map((p) => (
        <Photo reveal={reveal} key={p.key} imageKey={p.key} src={p.url} />
      ))}
    </div>
  );
};

export const Gallery = ({ reveal }: { reveal: boolean }) => {
  const user = getAnonUser();
  const { data } = useGetAllPhotos(user!.id);
  return (
    <div className="grid grid-cols-3 gap-3 pb-25">
      {!data &&
        [
          { url: "/placeholder.svg", key: "1" },
          { url: "/placeholder.svg", key: "2" },
          { url: "/placeholder.svg", key: "3" },
        ].map((p) => (
          <Photo
            reveal={false}
            pending
            key={p.key}
            imageKey={p.key}
            src={p.url}
          />
        ))}
      {data?.map((p) => (
        <Photo reveal={reveal} key={p.key} imageKey={p.key} src={p.url} />
      ))}
    </div>
  );
};

export default function Feed({
  reveal,
  gallery,
}: {
  reveal: boolean;
  gallery: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"gallery" | "pov">("pov");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as any)}
    >
      <TabsList className={cn(gallery && "grid grid-cols-2", "w-full")}>
        <TabsTrigger className="w-full" value="pov">
          POV
        </TabsTrigger>
        {gallery && <TabsTrigger value="gallery">Galeria</TabsTrigger>}
      </TabsList>
      <TabsContent value="pov">
        <POV reveal={reveal} />
      </TabsContent>
      <TabsContent value="gallery">
        <Gallery reveal={reveal} />
      </TabsContent>
    </Tabs>
  );
}
