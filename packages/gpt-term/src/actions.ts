import { EXIT_CODES, ExitCode } from "./config";
import { ChatMessage, addContext } from "./context";
import { getResponse } from "./gpt";
import { loadingSpinner } from "./spinner";
import { parseError, Exception } from "./errorHandler";
import { systemResponse, assistantResponse } from "./responseHandler";

import {
  getPrompt,
  CliChatOptions,
  CliKeyOptions,
  saveAndEncryptKey,
  decryptAndReturnKey,
  deleteKey,
  keyPrompt,
} from "./utils";

export const addKey = async (opts: CliKeyOptions): Promise<void> => {
  return await saveAndEncryptKey(opts.key);
};

export const removeKey = async (): Promise<void> => {
  return await deleteKey();
};

export const createChat = async (opts: CliChatOptions): Promise<void> => {
  systemResponse(`Starting new chat using ${opts.model}`, opts.verbose);
  let apiKey = await decryptAndReturnKey();

  if (!apiKey) {
    apiKey = await keyPrompt();
    saveAndEncryptKey(apiKey);
  }

  const processNextMessage = async (): Promise<void> => {
    const prompt = await getPrompt();

    if (EXIT_CODES.includes(prompt as ExitCode)) {
      assistantResponse("goodbye");
    }

    addContext({ role: "user", content: prompt });

    try {
      const response = await getResponse(apiKey, opts);
      if (response) {
        addContext(response as ChatMessage);
        assistantResponse(response.content);
      }
    } catch (error) {
      const errorMessage = parseError(error as Exception);
      loadingSpinner.fail(errorMessage);
    } finally {
      await processNextMessage();
    }
  };

  await processNextMessage();
};