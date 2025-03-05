import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(",");
  if (arr.length < 0) return null;
  const mime = arr
    .at(0)
    ?.match(/:(.*?);/)!
    .at(1);
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function stringHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(36);
}

export function renameFile(file: File, name?: string) {
  const blob = file.slice(0, file.size, file.type);
  const newFile = new File(
    [blob],
    name ?? stringHash(file.name + new Date().toISOString()),
    {
      type: file.type,
    }
  );
  return newFile;
}

export const baseUrl = ({
  path,
  host,
}: {
  path: string;
  host?: string | null;
}) => {
  if (host) return (process.env.VERCEL ? "https://" : "http://") + host + path;
  else {
    return `${window.location.protocol}//${window.location.host}/${path}`;
  }
};
