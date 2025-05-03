import { isAfter } from "date-fns";
import text from "../text.json";
import { AlbumLink, ShowQrCode } from "./code";
import { cn } from "@/lib/utils";

export const CodeList = ({
  codes,
}: {
  codes: { code: string; expireAt: string }[];
}) => {
  return (
    <div className="space-y-2">
      {codes.length === 0 && (
        <div className="mt-4 p-4 bg-muted rounded-md flex justify-between items-center">
          <p className="text-2xl font-bold">No guest code generated yet.</p>
        </div>
      )}
      {codes.map(({ code, expireAt }) => (
        <div
          className="py-2 px-4 bg-muted rounded-md flex justify-between items-center"
          key={code}
        >
          <div>
            <p className="font-semibold text-sm md:text-base">
              {text.en.settings.guest_code_generator.generated_code}
            </p>
            <p className="md:text-2xl font-bold">{code}</p>
          </div>
          <div
            className={cn(
              isAfter(new Date(), expireAt) && "hidden",
              "grid grid-cols-2"
            )}
          >
            <ShowQrCode code={code} />
            <AlbumLink code={code} />
          </div>
        </div>
      ))}
    </div>
  );
};
