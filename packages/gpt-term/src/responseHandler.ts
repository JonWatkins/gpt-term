import { CHAT_PREFIX, ASSISTANT } from "./config";
import chalk from "chalk";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

marked.setOptions({
  renderer: new TerminalRenderer(),
});

export const systemResponse = (
  response: string,
  shouldLog: boolean = false,
): void => {
  if (shouldLog) {
    const parsedResponse = chalk.green(response);
    console.log(parsedResponse);
  }
};

export const assistantResponse = (response: string): void => {
  const parsedMarkdown = marked.parse(response);
  const parsedResponse = `${chalk.green(
    CHAT_PREFIX,
  )} ${ASSISTANT} ${parsedMarkdown}`;
  console.log(parsedResponse);
  if (response === "goodbye") {
    process.exit(0);
  }
};
