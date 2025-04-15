import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin h-10 w-10" />
    </div>
  );
}
