export type ExitCode = "exit" | "quit" | "bye";
export const EXIT_CODES: ExitCode[] = ["exit", "quit", "bye"];
export const VERSION: string = "1.0.0";

export const ASSISTANT: string = "ChatGPT:";
export const CHAT_PREFIX: string = "✔";
export const WRITE_INTERVAL: number = 10;
export const MAX_HISTORY: number = 10;
export const DEFAULT_MAX_TOKENS: string = "2048";
export const DEFAULT_PRESENCE_PENALTY: string = "0";
export const DEFAULT_FREQUENCY_PENALTY: string = "0";
export const DEFAULT_MODEL: string = "gpt-3.5-turbo";
export const DEFAULT_TEMP: string = "0.5";

export const DEFAULT_SYSTEM_PROMPT =
  "You are ChatGPT, a large language model trained by OpenAI, based on " +
  "the GPT-3.5 architecture. Knowledge cutoff: 2021-09 Current date: {currentDate}";

export const NOT_FOUND_ERROR: string =
  "Model not found. Please check the model name.";
export const RATE_EXCEEDED_ERROR: string = "API Rate Limit Exceeded.";
export const BAD_REQUEST_ERROR: string =
  "Bad Request: Prompt provided is empty or too long.";
export const QUOTA_EXCEEDED_ERROR: string = "API Quota Exceeded";
export const SEVICE_UNAVAILABLE_ERROR: string = "Service Unavailable";
export const DEFAULT_ERROR: string = "Unable to process request";

export const KEY_FILE: string = "key.txt";
export const SECRET: string =
  "d139c8f475208eb70e0b8649e72164a7fa84bf3d3b84194dd72055a11ba3017a";
