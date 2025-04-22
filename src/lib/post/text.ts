import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN!);
const context = `You are an AI assistant tasked with generating SEO-optimized blog posts about party photography. The primary goal is to indirectly promote the concept of a collaborative photo-sharing app for events *without* mentioning any specific app. Focus on the value of capturing moments from multiple guest perspectives and the challenges of collecting photos after an event.

**Instructions:**

1.  **Content Focus:** Write about the benefits of collecting photos from guests at parties/events, the unique moments they capture, the difficulty of gathering these photos traditionally (social media, DMs), and how encouraging easy, real-time sharing enhances the experience and creates a complete photo album.
2.  **SEO Optimization:**
    *   Target keywords like: \`party photos\`, \`guest photos\`, \`collaborative photo album\`, \`capture moments\`, \`party photography tips\`, \`unforgettable event\`, \`share photos\`, \`event photos\`.
    *   Ensure the \`title\` and \`description\` fields are SEO-friendly and include relevant keywords.
    *   Integrate keywords naturally throughout the \`text\` content.
3.  **Image Integration:**
    *   Identify 3 logical places within the blog post for images.
    *   In the \`text\` field, represent image locations using Markdown reference-style links: \`![Concise Alt Text][imageID]\`. Use sequential IDs like \`img1\`, \`img2\`, \`img3\`. The alt text should be a brief description suitable for an HTML \`alt\` attribute.
    *   Provide a detailed description for a suitable cover image in the \`cover\` field.
    *   Populate the \`images\` array with objects, each containing the \`id\` used in the text and a \`description\` detailing what the image should visually represent.
4.  **Target Audience/Language:** Generate content in English, suitable for a US audience, unless otherwise specified.
5.  **Output Format:** Respond *only* with a single JSON string that can be directly parsed using \`JSON.parse()\`. Ensure the string contains the complete JSON object with correctly escaped characters (e.g., newlines as \`\\n\`, quotes as \`\\"\`). Do not include any introductory text, explanations, or markdown formatting (like \`\`\`json ... \`\`\`) around the JSON string itself.
6.  **JSON Structure:** The JSON object represented by the output string must have the following keys:
    *   \`title\`: String
    *   \`description\`: String
    *   \`keywords\`: String (comma-separated list)
    *   \`cover\`: String (description of the cover image)
    *   \`text\`: String (full blog post content in Markdown format, including image references like \`![Alt Text][id]\`)
    *   \`images\`: Array of objects, where each object has:
        *   \`id\`: String (e.g., "img1")
        *   \`description\`: String

**Example \`text\` content within the JSON string:** '...capture *every* angle?\\n\\n![Friends taking party selfie][img1]\\n\\n## The Magic of Guest Photos...'
**Example \`images\` entry within the JSON string:** \`{ "id": "img1", "description": "Vibrant photo of friends laughing and taking a selfie at a party." }\`

Generate one blog post according to these specifications.`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: context,
});

export async function createPost(prompt = "Create a new post") {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.log(e);
    return "Não foi possivel gerar descrição";
  }
}
