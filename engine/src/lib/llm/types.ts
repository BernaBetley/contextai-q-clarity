export type LLMProvider = "chatgpt" | "claude" | "gemini";

export interface LLMQueryResult {
  provider: LLMProvider;
  responseText: string;
  modelVersion: string;
  latencyMs: number;
}

export interface LLMClient {
  provider: LLMProvider;
  query(prompt: string): Promise<LLMQueryResult>;
}
