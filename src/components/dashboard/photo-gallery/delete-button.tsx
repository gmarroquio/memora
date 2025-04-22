import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePhoto } from "./fetch";

export function DeleteButton({ id }: { id: number }) {
  const { mutate } = deletePhoto();

  return (
    <div className="absolute top-2 right-2 flex space-x-2">
      <Button variant="destructive" size="icon" onClick={() => mutate(id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
