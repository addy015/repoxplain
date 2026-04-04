import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateExplanation = async (filePath, fileContent = "") => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-2.5-flash as the stable fast model, since 1.5 is no longer supported in v1beta API limits.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a helpful code assistant. A developer is exploring a GitHub repository and wants to understand what a specific file does.

File path: ${filePath}

${fileContent ? `--- FILE CONTENT START ---\n${fileContent}\n--- FILE CONTENT END ---` : ""}

Based on the file ${fileContent ? "code" : "path and name"}, explain in 3-4 simple sentences:
1. What this file likely does
2. Why it exists in the project

Keep it beginner-friendly, clear, and concise. Don't use jargon. Respond in English.
`;

    const result = await model.generateContent(prompt);


    return result.response.text();
  } catch (error) {
    console.log("AI Error:", error.message);
    throw new Error("Failed to generate explanation");
  }
};