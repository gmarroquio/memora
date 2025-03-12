export async function convertImage(
  file: File,
  quality = 0.5,
  resize = 0.5,
  preview = true
) {
  return new Promise<File>((res) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth * resize;
      canvas.height = image.naturalHeight * resize;
      canvas
        .getContext("2d")
        ?.drawImage(
          image,
          0,
          0,
          image.naturalWidth * resize,
          image.naturalHeight * resize
        );
      canvas.toBlob(
        (blob) => {
          if (blob) {
            res(
              new File(
                [blob],
                file.name.split(".")[0] + (preview ? "-preview.jpeg" : ""),
                {
                  type: blob.type,
                }
              )
            );
          }
        },
        preview ? "image/jpeg" : file.type,
        quality
      );
    };
    image.src = URL.createObjectURL(file);
  });
}
