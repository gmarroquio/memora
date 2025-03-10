export async function convertImage(file: File) {
  return new Promise<File>((res) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth / 2;
      canvas.height = image.naturalHeight / 2;
      canvas
        .getContext("2d")
        ?.drawImage(
          image,
          0,
          0,
          image.naturalWidth / 2,
          image.naturalHeight / 2
        );
      canvas.toBlob(
        (blob) => {
          if (blob) {
            res(
              new File([blob], file.name + "-preview" + ".webp", {
                type: blob.type,
              })
            );
          }
        },
        "image/webp",
        0.5
      );
    };
    image.src = URL.createObjectURL(file);
  });
}
