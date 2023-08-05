import { program } from "commander";
import chalk from "chalk";
import { getPrompt, getResponse, ChatMessage } from "./utils";

program.version("0.0.6");

program
  .command("chat")
  .option("-m, --model <model>", "ChatGpt model to use", "gpt-3.5-turbo")
  .option("-v, --verbose", "Run with verbose logging")
  .action(async (opts) => {
    const messages: ChatMessage[] = [];

    const processNextMessage = async (): Promise<void> => {
      const prompt = await getPrompt();

      if (["exit", "quit", "bye"].includes(prompt)) {
        console.log(chalk.green("goodbye"));
        process.exit(0);
      }

      const message: ChatMessage = { role: "user", content: prompt };
      messages.push(message);

      try {
        const response = await getResponse(messages, opts.model);
        if (response) {
          messages.push(response as ChatMessage);
          console.log("ChatGPT: ", response?.content);
        }
      } catch (error) {
        // Remove the last sent message from the stack, as we did not get
        // a response for it.
        messages.pop();
        console.log(error);
      } finally {
        await processNextMessage();
      }
    };

    await processNextMessage();
  });

program.parse(process.argv);
