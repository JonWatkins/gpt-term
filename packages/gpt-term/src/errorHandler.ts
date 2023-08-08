import winston from "winston";
import { fileExists, CliLogOptions } from "./utils";
import { __dirname } from "./dirname";
import fs from "node:fs/promises";
import chalk from "chalk";

import {
  NOT_FOUND_ERROR,
  RATE_EXCEEDED_ERROR,
  BAD_REQUEST_ERROR,
  QUOTA_EXCEEDED_ERROR,
  SEVICE_UNAVAILABLE_ERROR,
  DEFAULT_ERROR,
} from "./config";

const logPath: string = `${__dirname}/error.log`;

export interface Exception {
  message: string;
  response: {
    status: string;
    data: {
      error?: unknown;
    };
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
  const status: number = parseInt(error.response.status);
  const errorData = error.response.data.error;
  logger.error(error.message, errorData);

  switch (status) {
    case 404:
      return NOT_FOUND_ERROR;
    case 429:
      return RATE_EXCEEDED_ERROR;
    case 400:
      return BAD_REQUEST_ERROR;
    case 402:
      return QUOTA_EXCEEDED_ERROR;
    case 503:
      return SEVICE_UNAVAILABLE_ERROR;
    default:
      return DEFAULT_ERROR;
  }
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
