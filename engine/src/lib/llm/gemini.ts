import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMClient, LLMQueryResult } from "./types";

const MODEL = "gemini-2.0-flash";

export function createGeminiClient(apiKey: string): LLMClient {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL });

  return {
    provider: "gemini",
    async query(prompt: string): Promise<LLMQueryResult> {
      const start = Date.now();
      const result = await model.generateContent(prompt);
      const latencyMs = Date.now() - start;

      return {
        provider: "gemini",
        responseText: result.response.text(),
        modelVersion: MODEL,
        latencyMs,
      };
    },
  };
}
