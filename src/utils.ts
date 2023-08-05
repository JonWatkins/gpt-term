import prompts from "prompts";
import fs from "node:fs/promises";
import * as url from "url";
import { encrypt, decrypt } from "./encryption";
import { KEY_FILE } from "./config";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const KEY_PATH = `${__dirname}/${KEY_FILE}`;

export interface CliKeyOptions {
  key: string;
}

export interface CliChatOptions {
  model: string;
  temperature: string;
  verbose: boolean;
}

export const getPrompt = async (): Promise<string> => {
  const { prompt } = await prompts({
    type: "text",
    name: "prompt",
    message: "You: ",
    validate: (value) =>
      value.length === 0 ? "You must enter a prompt" : true,
  });

  return prompt;
};

export const saveAndEncryptKey = async (key: string): Promise<void> => {
  return fs.writeFile(KEY_PATH, JSON.stringify(encrypt(key)));
};

export const decryptAndReturnKey = async (): Promise<string> => {
  return decrypt(JSON.parse(await fs.readFile(KEY_PATH, "utf8")));
};

export const deleteKey = async (): Promise<void> => {
  return fs.unlink(KEY_PATH);
};
