import { Configuration, OpenAIApi } from "openai";
import { getContext, ChatMessage } from "./context";
import { loadingSpinner } from "./spinner";
import { CliChatOptions, insertCurrentDate } from "./utils";
import { DEFAULT_SYSTEM_PROMPT } from "./config";

export const getResponse = async (
  apiKey: string,
  options: CliChatOptions,
): Promise<ChatMessage> => {
  loadingSpinner.start();

  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);
  let systemPrompt = options.systemPrompt;

  if (systemPrompt === DEFAULT_SYSTEM_PROMPT) {
    systemPrompt = insertCurrentDate(systemPrompt);
  }

  const context: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...getContext(),
  ];

  console.log(context);

  const completion = await openai.createChatCompletion({
    messages: context,
    model: options.engine,
    temperature: parseInt(options.temperature),
    max_tokens: parseInt(options.maxTokens),
    presence_penalty: parseInt(options.presencePenalty),
    frequency_penalty: parseInt(options.frequencyPenalty),
    n: 1,
    top_p: 1,
  });

  loadingSpinner.succeed();

  return completion.data.choices[0].message as ChatMessage;
};
