import { Configuration, OpenAIApi } from "openai";
import { getContext } from "./context";
import { CliChatOptions, decryptAndReturnKey } from "./utils";
import { ChatMessage } from "./context";

export const getResponse = async (
  options: CliChatOptions,
): Promise<ChatMessage> => {
  const apiKey = await decryptAndReturnKey();

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

  return completion.data.choices[0].message as ChatMessage;
};
