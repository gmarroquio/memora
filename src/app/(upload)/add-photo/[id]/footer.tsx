import { Camera } from "lucide-react";

export const Footer = ({ taken, limit }: { limit: number; taken: number }) => {
  return (
    <div className="bg-gray-900 flex justify-between items-center mb-10">
      <div className="flex-1">
        {taken}/{limit}
      </div>
      <div className="bg-primary p-3 rounded-full border-2 border-white">
        <Camera />
      </div>
      <div className="flex-1 items-end">
        {taken}/{limit}
      </div>
    </div>
  );
};
