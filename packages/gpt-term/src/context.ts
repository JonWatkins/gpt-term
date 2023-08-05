export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

let chatContext: ChatMessage[] = [];

export const getContext = (): ChatMessage[] => {
  return chatContext;
};

export const addContext = (message: ChatMessage): void => {
  chatContext = [...chatContext, message];
};
