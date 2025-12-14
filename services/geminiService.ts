import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Edits an image using Gemini 2.5 Flash Image model based on a text prompt.
 * 
 * @param imageBase64 The base64 string of the image (without the data URL prefix).
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text prompt describing the edit.
 * @returns The base64 string of the generated image or null if failed.
 */
export const editImageWithGemini = async (
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    
    console.warn("No image data found in response");
    return null;
  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw error;
  }
};