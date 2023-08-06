import { program } from "commander";
import { createChat, addKey, removeKey } from "./actions";

import {
  VERSION,
  DEFAULT_MODEL,
  DEFAULT_TEMP,
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_MAX_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_FREQUENCY_PENALTY,
} from "./config";

const { argv } = process;

program.version(VERSION);

program
  .command("chat")
  .option("-e, --engine <string>", "ChatGpt model to use.", DEFAULT_MODEL)
  .option(
    "-m, --max-tokens <number>",
    "The maximum number of tokens to generate in the chat completion.",
    DEFAULT_MAX_TOKENS,
  )
  .option(
    "-t, --temperature <string>",
    "The sampling temperature to use between 0 and 2 higher values make the output more random.",
    DEFAULT_TEMP,
  )
  .option(
    "-p, --presence-penalty <number>",
    "Number between -2.0 and 2.0, positive numbers increase the model's likelihood to talk about new topics.",
    DEFAULT_PRESENCE_PENALTY,
  )
  .option(
    "-f, --frequency-penalty <number>",
    "Number between -2.0 and 2.0, Positive values decrease the model's likelihood to repeat the same line verbatim.",
    DEFAULT_FREQUENCY_PENALTY,
  )
  .option(
    "-s, --system-prompt <string>",
    "Your set of rules and instructions to the model that will determine how it behaves.",
    DEFAULT_SYSTEM_PROMPT,
  )
  .option("-v, --verbose", "Run with verbose logging.")
  .action(createChat);

program
  .command("addkey")
  .option("-k, --key <string>", "Your OpenAI API key.")
  .action(addKey);

program.command("removekey").action(removeKey);

program.parse(argv);
