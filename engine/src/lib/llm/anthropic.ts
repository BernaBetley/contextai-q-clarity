import Anthropic from "@anthropic-ai/sdk";
import type { LLMClient, LLMQueryResult } from "./types";

const MODEL = "claude-sonnet-4-5-20250929";

export function createAnthropicClient(apiKey: string): LLMClient {
  const client = new Anthropic({ apiKey });

  return {
    provider: "claude",
    async query(prompt: string): Promise<LLMQueryResult> {
      const start = Date.now();
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      });
      const latencyMs = Date.now() - start;

      const text = response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");

      return {
        provider: "claude",
        responseText: text,
        modelVersion: response.model,
        latencyMs,
      };
    },
  };
}
