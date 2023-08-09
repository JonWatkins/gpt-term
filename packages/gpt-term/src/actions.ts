import chalk from "chalk";
import { EXIT_CODES, ExitCode } from "./config";
import { getResponse } from "./gpt";
import { spinnerFail } from "./spinner";
import { systemResponse, assistantResponse } from "./responseHandler";
import { ChatMessage, addContext, initContext, storeContext } from "./context";

import {
  parseError,
  Exception,
  fetchLogs,
  dumpLogs,
  clearLogs,
} from "./errorHandler";

import {
  getPrompt,
  CliChatOptions,
  CliKeyOptions,
  CliLogOptions,
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

export const handleLogs = async (opts: CliLogOptions) => {
  if (opts.clear) {
    await clearLogs();
    return;
  }

  const logs = await fetchLogs();
  await dumpLogs(logs, opts);
};

export const createChat = async (opts: CliChatOptions): Promise<void> => {
  systemResponse(`Starting new chat using ${opts.engine}`, opts.verbose);
  systemResponse(
    `${chalk.yellow("♦")} Please type ${chalk.red("quit")} to exit`,
    true,
  );

  await initContext(opts.clearHistory);
  let apiKey = await decryptAndReturnKey();

  if (!apiKey) {
    apiKey = await keyPrompt();
    saveAndEncryptKey(apiKey);
  }

  const processNextMessage = async (): Promise<void> => {
    const prompt = await getPrompt();

    if (EXIT_CODES.includes(prompt as ExitCode)) {
      await assistantResponse("goodbye");
      await storeContext();
      process.exit(0);
    }

    addContext({ role: "user", content: prompt });

    try {
      const response = await getResponse(apiKey, opts);
      if (response) {
        addContext(response as ChatMessage);
        await assistantResponse(response.content);
      }
    } catch (error) {
      const errorMessage = parseError(error as Exception);
      spinnerFail(errorMessage);
    } finally {
      await processNextMessage();
    }
  };

  await processNextMessage();
};
