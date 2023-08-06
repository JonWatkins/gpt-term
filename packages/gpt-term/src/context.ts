import { MAX_HISTORY } from "./config";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

let chatContext: ChatMessage[] = [];

export const getContext = (): ChatMessage[] => {
  return chatContext;
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
