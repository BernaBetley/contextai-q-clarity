import OpenAI from "openai";
import type { LLMClient, LLMQueryResult } from "./types";

const MODEL = "gpt-4o";

export function createOpenAIClient(apiKey: string): LLMClient {
  const client = new OpenAI({ apiKey });

  return {
    provider: "chatgpt",
    async query(prompt: string): Promise<LLMQueryResult> {
      const start = Date.now();
      const response = await client.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 2048,
      });
      const latencyMs = Date.now() - start;

      return {
        provider: "chatgpt",
        responseText: response.choices[0]?.message.content ?? "",
        modelVersion: response.model,
        latencyMs,
      };
    },
  };
}
