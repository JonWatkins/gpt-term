import { Configuration, OpenAIApi } from "openai";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import prompts from "prompts";
import chalk from "chalk";
import type { Arguments } from "yargs";

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
}

const messages: ChatMessage[] = []

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

async function getPrompt (): Promise<string> {
  const { prompt } = await prompts({
    type: 'text',
    name: 'prompt',
    message: 'You: '
  });

  return prompt;
}

async function makeRequest(model: string) {
  const prompt = await getPrompt()

  if (["exit", "quit", "bye"].includes(prompt)) {
    console.log(chalk.green("goodbye"));
    process.exit(0);
  }

  const message: ChatMessage = { role: 'user', content: prompt }
  messages.push(message)

  try {
    const completion = await openai.createChatCompletion({
      messages,
      model
    })
    const assistantReply = completion.data.choices[0].message.content;
    messages.push({ role: 'assistant', content: assistantReply });
    console.log(assistantReply);
    await makeRequest(model)    
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

yargs(hideBin(process.argv))
  .command<{ model: string, verbose?: boolean }>('chat [model]', 'Create new chat', (yargs) => {
    return yargs
      .positional('model', {
        describe: 'The ChatGpt model to use',
        default: 'gpt-3.5-turbo'
      })
  }, async (argv: Arguments<{ model: string, verbose?: boolean }>) => {
    if (argv.verbose) {
      console.info(chalk.green(`Starting new chat using ${argv.model}`))
    }
    await makeRequest(argv.model)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .parse();
