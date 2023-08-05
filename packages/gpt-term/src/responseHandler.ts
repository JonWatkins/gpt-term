import { CHAT_PREFIX, ASSISTANT, WRITE_INTERVAL } from "./config";
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

export const assistantResponse = (response: string): Promise<string> => {
  const parsedMarkdown = marked.parse(response);
  const parsedResponse = `${chalk.green(
    CHAT_PREFIX,
  )} ${ASSISTANT} ${parsedMarkdown}`;

  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < parsedResponse.length) {
        process.stdout.write(parsedResponse[i]);
        i++;
      } else {
        clearInterval(interval);
        resolve(parsedResponse);
      }
    }, WRITE_INTERVAL);
  });
};
