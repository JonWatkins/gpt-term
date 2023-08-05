import chalk from "chalk";
import { CHAT_PREFIX, ASSISTANT } from "./config";
import { ChatMessage, addContext } from "./context";
import { getResponse } from "./gpt";
import { loadingSpinner } from "./spinner";
import {
  getPrompt,
  CliChatOptions,
  CliKeyOptions,
  saveAndEncryptKey,
  deleteKey,
} from "./utils";

export const addKey = async (opts: CliKeyOptions): Promise<void> => {
  return await saveAndEncryptKey(opts.key);
};

export const removeKey = async (): Promise<void> => {
  return await deleteKey();
};

export const createChat = async (opts: CliChatOptions): Promise<void> => {
  if (opts.verbose) {
    console.info(chalk.green(`Starting new chat using ${opts.model}`));
  }

  const processNextMessage = async (): Promise<void> => {
    const prompt = await getPrompt();

    if (["exit", "quit", "bye"].includes(prompt)) {
      console.log(`${chalk.green(CHAT_PREFIX)} ${ASSISTANT} goodbye`);
      process.exit(0);
    }

    addContext({ role: "user", content: prompt });
    loadingSpinner.start();

    try {
      const response = await getResponse(opts);
      loadingSpinner.succeed();
      if (response) {
        addContext(response as ChatMessage);
        console.log(
          `${chalk.green(CHAT_PREFIX)} ${ASSISTANT}`,
          response.content,
        );
      }
    } catch (error) {
      loadingSpinner.fail("Unable to get response");
      console.error(error);
    } finally {
      await processNextMessage();
    }
  };

  await processNextMessage();
};
