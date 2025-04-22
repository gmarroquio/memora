import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN,
});

export async function generateImage(description: string) {
  const input = {
    prompt: description,
    go_fast: true,
    megapixels: "1",
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80,
    num_inference_steps: 4,
  };

  const image = await replicate.run("black-forest-labs/flux-schnell", {
    input,
  });
  return image;
}
