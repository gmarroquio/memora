"use client";

import { CameraComponent } from "@/components/camera";
//import { UploadButton } from "@/components/upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CameraComponent />
      {/*
              <UploadButton
        className="ut-button:bg-primary"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          console.log("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />

      */}
    </main>
  );
}
