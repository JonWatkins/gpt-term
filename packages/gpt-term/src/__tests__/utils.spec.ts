import * as utils from "../utils";
import { DEFAULT_SYSTEM_PROMPT } from "../config";

// @ts-ignore
import { expectPrompts } from "inquirer";

describe("utils", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getCurrentDate", () => {
    it("should have a method to get the current date", () => {
      expect(utils.getCurrentDate()).toEqual("2023-11-26");
    });
  });

  describe("intertCurrentDate", () => {
    it("should be able to replace the date in a string", () => {
      expect(utils.insertCurrentDate(DEFAULT_SYSTEM_PROMPT)).toEqual(
        "You are ChatGPT, a large language model trained by OpenAI," +
          " based on the GPT-3.5 architecture. Knowledge cutoff: 2021-09 Current date: 2023-11-26",
      );
    });
  });

  describe("fileExists", () => {
    it("should return false if a file does not exist", async () => {
      expect(await utils.fileExists("notfound.txt")).toEqual(false);
    });

    it("should return true if a file exists", async () => {
      expect(await utils.fileExists("basePath/exists.txt")).toEqual(true);
    });
  });

  describe("apiKey utils", () => {
    it("should be able to encrypt a key", async () => {
      await utils.saveAndEncryptKey("test-key");
    });

    it("should be able to decrypt a key", async () => {
      expect(await utils.decryptAndReturnKey()).toEqual("test-key");
    });

    it("should be able to remove a key", async () => {
      await utils.deleteKey();
      expect(await utils.decryptAndReturnKey()).toEqual("");
    });
  });

  describe("prompts", () => {
    describe("getPrompt", () => {
      it("should be able to return a user prompt", async () => {
        expectPrompts([
          {
            name: "prompt",
            message: "You: ",
            input: "Hello World",
          },
        ]);
        expect(await utils.getPrompt()).toEqual("Hello World");
      });
    });

    describe("keyPrompt", () => {
      it("should be able to return a user prompt", async () => {
        expectPrompts([
          {
            name: "prompt",
            message: "Key not found, Please enter your API key:",
            input: "ws8f76qf8d76wf8w6f8w6f8w6fw",
          },
        ]);
        expect(await utils.keyPrompt()).toEqual("ws8f76qf8d76wf8w6f8w6f8w6fw");
      });
    });
  });
});
