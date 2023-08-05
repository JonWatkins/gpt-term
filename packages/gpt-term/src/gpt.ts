import { Configuration, OpenAIApi } from "openai";
import { getContext } from "./context";
import { ChatMessage } from "./context";
import { loadingSpinner } from "./spinner";
import { CliChatOptions } from "./utils";

export const getResponse = async (
  apiKey: string,
  options: CliChatOptions,
): Promise<ChatMessage> => {
  loadingSpinner.start();

  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    messages: getContext(),
    model: options.model,
    temperature: parseInt(options.temperature),
    n: 1,
  });

  loadingSpinner.succeed();

  return completion.data.choices[0].message as ChatMessage;
};
