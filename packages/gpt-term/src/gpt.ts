import { Configuration, OpenAIApi } from "openai";
import { getContext, ChatMessage } from "./context";
import { spinnerStart, spinnerSucceed } from "./spinner";
import { CliChatOptions, insertCurrentDate } from "./utils";
import { DEFAULT_SYSTEM_PROMPT } from "./config";

export const getResponse = async (
  apiKey: string,
  options: CliChatOptions,
): Promise<ChatMessage> => {
  spinnerStart();

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

  const stop =
    typeof options.stop === "string"
      ? options.stop.split(",").map((i: string): string => i.trim())
      : undefined;

  const completion = await openai.createChatCompletion({
    messages: context,
    model: options.engine,
    temperature: parseInt(options.temperature),
    max_tokens: parseInt(options.maxTokens),
    presence_penalty: parseInt(options.presencePenalty),
    frequency_penalty: parseInt(options.frequencyPenalty),
    stop,
    n: 1,
    top_p: 1,
  });

  spinnerSucceed();

  return completion.data.choices[0].message as ChatMessage;
};
