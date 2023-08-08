import winston from "winston";
import { fileExists, CliLogOptions } from "./utils";
import { __dirname } from "./dirname";
import fs from "node:fs/promises";
import chalk from "chalk";
import { DEFAULT_ERROR } from "./config";

const logPath: string = `${__dirname}/error.log`;

export interface Exception {
  message?: string;
  response?: {
    status?: number;
    data?: ErrorData;
  };
}

export interface ErrorData {
  error?: {
    code?: string;
    level?: string;
    message?: string;
    param?: unknown;
    service?: string;
    type?: string;
  };
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: logPath,
      level: "error",
    }),
  ],
});

export const parseError = (error: Exception): string => {
  let message: string | undefined;
  let errorData: ErrorData;

  if (!error.response) {
    errorData = {};
    message = error.message;
  } else {
    errorData = error.response.data || {};
    if (errorData.error && errorData.error.message) {
      message = errorData.error.message;
    }
  }

  if (typeof message !== "string") {
    message = DEFAULT_ERROR;
  }

  logger.error(message, errorData);
  return message;
};

export const fetchLogs = async (): Promise<string> => {
  const exists = await fileExists(logPath);
  if (exists) {
    return await fs.readFile(logPath, "utf-8");
  }

  return "No logs found";
};

export const clearLogs = async (): Promise<void> => {
  const exists = await fileExists(logPath);
  if (exists) {
    await fs.unlink(logPath);
  }
};

export const dumpLogs = async (
  logs: string,
  opts: CliLogOptions,
): Promise<void> => {
  if (opts.format === "plain") {
    console.log(logs);
    return;
  }

  const lines = logs
    .split("\n")
    .filter((line) => line && line !== "")
    .map((line) => JSON.parse(line));

  if (opts.format === "json") {
    lines.forEach((line) => {
      console.log(JSON.stringify(line, null, 2));
    });
    return;
  }

  console.log(chalk.red("✖"), ` Unknown log format: ${opts.format}`);
};
