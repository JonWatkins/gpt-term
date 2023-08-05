import { CHAT_PREFIX, ASSISTANT } from "./config";
import chalk from "chalk";

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
  const parsedResponse = `${chalk.green(CHAT_PREFIX)} ${ASSISTANT} ${response}`;
  console.log(parsedResponse);
  if (response === "goodbye") {
    process.exit(0);
  }
};
