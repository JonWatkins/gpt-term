import { Configuration, OpenAIApi } from "openai";
import prompts from "prompts";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface CliOptions {
  model: string;
  temperature: string;
  verbose: boolean;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const getPrompt = async (): Promise<string> => {
  const { prompt } = await prompts({
    type: "text",
    name: "prompt",
    message: "You: ",
  });

  return prompt;
};

export const getResponse = async (
  messages: ChatMessage[],
  options: CliOptions,
) => {
  const completion = await openai.createChatCompletion({
    messages,
    model: options.model,
    temperature: parseInt(options.temperature),
    n: 1,
  });
  return completion.data.choices[0].message;
};
