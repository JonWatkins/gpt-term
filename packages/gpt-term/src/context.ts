import fs from "node:fs/promises";
import { MAX_HISTORY } from "./config";
import { fileExists } from "./utils";
import { __dirname } from "./dirname";
const contextPath = `${__dirname}/context.txt`;

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

let chatContext: ChatMessage[] = [];

export const initContext = async (clearHistory: boolean): Promise<void> => {
  if (clearHistory) {
    resetContext(); // make sure the array is indeed empty
    return;
  }
  const exists = await fileExists(contextPath);
  if (exists) {
    const context = JSON.parse(await fs.readFile(contextPath, "utf-8"));
    if (Array.isArray(context)) {
      chatContext = context;
    }
  }
};

export const storeContext = async (): Promise<void> => {
  await fs.writeFile(contextPath, JSON.stringify(getContext()));
};

export const getContext = (): ChatMessage[] => {
  return chatContext;
};

export const resetContext = (): void => {
  chatContext = [];
};

export const addContext = (message: ChatMessage): void => {
  if (chatContext.length >= MAX_HISTORY) {
    // remove the first entry of the array before we add the new message
    const [, ...rest] = chatContext;
    chatContext = [...rest, message];
  } else {
    chatContext = [...chatContext, message];
  }
};
