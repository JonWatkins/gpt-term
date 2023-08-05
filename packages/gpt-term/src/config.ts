export type ExitCode = "exit" | "quit" | "bye";
export const VERSION: string = "0.1.3";
export const ASSISTANT: string = "ChatGPT:";
export const CHAT_PREFIX: string = "✔";
export const WRITE_INTERVAL: number = 10;
export const DEFAULT_MODEL: string = "gpt-3.5-turbo";
export const DEFAULT_TEMP: string = "0.5";
export const NOT_FOUND_ERROR: string =
  "Model not found. Please check the model name.";
export const RATE_EXCEEDED_ERROR: string = "API Rate Limit Exceeded.";
export const BAD_REQUEST_ERROR: string =
  "Bad Request: Prompt provided is empty or too long.";
export const QUOTA_EXCEEDED_ERROR: string = "API Quota Exceeded";
export const SEVICE_UNAVAILABLE_ERROR: string = "Service Unavailable";
export const DEFAULT_ERROR: string = "Unable to process request";
export const EXIT_CODES: ExitCode[] = ["exit", "quit", "bye"];
export const KEY_FILE: string = "key.txt";
export const KEY: string =
  "d139c8f475208eb70e0b8649e72164a7fa84bf3d3b84194dd72055a11ba3017a";
export const SECRET: string = "3dfb797d69839fc9d93486c6158b1277";
