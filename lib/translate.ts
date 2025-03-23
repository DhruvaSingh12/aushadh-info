import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed");
  }
};
