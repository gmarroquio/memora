import { format } from "date-fns";
import text from "../text.json";
import { AlbumLink, ShowQrCode } from "./code";

export const CodeList = ({
  codes,
}: {
  codes: { code: string; expireAt: string }[];
}) => {
  return (
    <div>
      {codes.length === 0 && (
        <div className="mt-4 p-4 bg-muted rounded-md flex justify-between items-center">
          <p className="text-2xl font-bold">No guest code generated yet.</p>
        </div>
      )}
      {codes.map(({ code, expireAt }) => (
        <div
          className="mt-4 p-4 bg-muted rounded-md flex justify-between items-center"
          key={code}
        >
          <div>
            <p className="font-semibold">
              {text.en.settings.guest_code_generator.generated_code}
            </p>
            <p className="text-2xl font-bold">{code}</p>
          </div>
          <div>
            <ShowQrCode code={code} />
            <AlbumLink code={code} />
          </div>
          <div>
            <p className="font-semibold">Expiration date:</p>
            <p className="text-2xl font-bold">
              {format(expireAt, "yyyy-MM-dd")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
