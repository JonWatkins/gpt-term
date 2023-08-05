import yargs from "yargs/yargs";
import prompts from "prompts";
import chalk from "chalk";
import { Configuration, OpenAIApi } from "openai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);
const args = yargs(process.argv.slice(2));

const parser = args
  .usage("GPT-Term")
  .options({
    verbose: {
      description: "Run with verbose logging",
      boolean: true,
      alias: "v",
    },
  })
  .command("chat [model]", "Start a new chat", (yargs) =>
    yargs.positional("model", {
      describe: "The ChatGpt model to use",
      default: "gpt-3.5-turbo",
      choices: [
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0301",
        "gpt-3.5-turbo-16k-0613",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-0613",
      ],
    }),
  )
  .demandCommand()
  .help()
  .strict();

const createChat = async (
  model: string,
  verbose: boolean = false,
): Promise<void> => {
  if (verbose) {
    console.info(chalk.green(`Starting new chat using ${model}`));
  }

  const messages: ChatMessage[] = [];

  const getResponse = async () => {
    const completion = await openai.createChatCompletion({
      messages,
      model,
    });
    return completion.data.choices[0].message;
  };

  const processNextMessage = async (): Promise<void> => {
    const { prompt } = await prompts({
      type: "text",
      name: "prompt",
      message: "You: ",
    });

    if (["exit", "quit", "bye"].includes(prompt)) {
      console.log(chalk.green("goodbye"));
      process.exit(0);
    }

    const message: ChatMessage = { role: "user", content: prompt };
    messages.push(message);

    try {
      const response = await getResponse();
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
};

const runCommands = async (): Promise<void> => {
  const { _: commands, model, verbose } = await parser.argv;
  const [command] = commands;
  if (command === "chat") {
    createChat(model as string, verbose as boolean);
  }
};

runCommands();
