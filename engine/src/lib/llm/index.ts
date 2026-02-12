import { createOpenAIClient } from "./openai";
import { createAnthropicClient } from "./anthropic";
import { createGeminiClient } from "./gemini";
import type { LLMClient } from "./types";

export type { LLMClient, LLMProvider, LLMQueryResult } from "./types";

export function createAllClients(keys: {
  openai: string;
  anthropic: string;
  google: string;
}): LLMClient[] {
  return [
    createOpenAIClient(keys.openai),
    createAnthropicClient(keys.anthropic),
    createGeminiClient(keys.google),
  ];
}
