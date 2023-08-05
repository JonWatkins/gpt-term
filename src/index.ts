import { program } from "commander";
import { createChat, addKey, removeKey } from "./actions";
import { DEFAULT_MODEL, DEFAULT_TEMP, VERSION } from "./config";
const { argv } = process;

program.version(VERSION);

program
  .command("chat")
  .option("-m, --model <model>", "ChatGpt model to use", DEFAULT_MODEL)
  .option(
    "-t, --temperature <temperature>",
    "The sampling temperature to use between 0 and 2 higher values make the output more random",
    DEFAULT_TEMP,
  )
  .option("-v, --verbose", "Run with verbose logging")
  .action(createChat);

program
  .command("addkey")
  .option("-k, --key <key>", "Your OpenAI API key.")
  .action(addKey);

program.command("removekey").action(removeKey);

program.parse(argv);
