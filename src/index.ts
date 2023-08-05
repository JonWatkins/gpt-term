import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import { getPrompt, getResponse } from "./utils";
import type { ChatMessage, CliOptions } from "./utils";

program.version("0.0.8");

program
  .command("chat")
  .option("-m, --model <model>", "ChatGpt model to use", "gpt-3.5-turbo")
  .option(
    "-t, --temperature <temperature>",
    "The sampling temperature to use between 0 and 2 higher values make the output more random",
    "0.5",
  )
  .option("-v, --verbose", "Run with verbose logging")
  .action(async (opts: CliOptions) => {
    if (opts.verbose) {
      console.info(chalk.green(`Starting new chat using ${opts.model}`));
    }

    const messages: ChatMessage[] = [];

    const processNextMessage = async (): Promise<void> => {
      const prompt = await getPrompt();
      const spinner = ora("ChatGPT: Thinking...");

      if (["exit", "quit", "bye"].includes(prompt)) {
        console.log(chalk.green("ChatGPT: goodbye"));
        process.exit(0);
      }

      const message: ChatMessage = { role: "user", content: prompt };
      messages.push(message);
      spinner.start();

      try {
        const response = await getResponse(messages, opts);
        spinner.succeed();
        if (response) {
          messages.push(response as ChatMessage);
          const parsedResponse = response.content as string;
          console.log("ChatGPT: ", parsedResponse);
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
