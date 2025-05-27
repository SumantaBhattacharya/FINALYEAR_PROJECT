import conf from "../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(conf.GEMINI_API_KEY);

const imageToBase64 = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });
};

const withRetry = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.code === 429) {
      await new Promise((res) => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const generateImageDescription = async (file) => {
  try {
    if (!file) throw new Error("No file provided");
    if (file.size > 5 * 1024 * 1024) throw new Error("File exceeds 5MB limit");
    if (!file.type.startsWith("image/")) throw new Error("Invalid image type");

    const base64Image = await imageToBase64(file);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-latest",
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.3,
        topP: 0.8,
        topK: 20,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
      ],
    });

    const result = await withRetry(() =>
      model.generateContent([
        { inlineData: { mimeType: file.type, data: base64Image } },
        "Generate a concise image description under 150 characters for web content.",
      ])
    );

    return result.response.text().slice(0, 300);  // Ensure it does not exceed 300 characters.
  } catch (error) {
    console.error("Generation error:", error);
    throw new Error(`Description failed: ${error.message}`);
  }
};
