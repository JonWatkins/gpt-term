jest.mock("../utils", () => {
  const original = jest.requireActual("../utils");
  return {
    ...original,
    fileExists: jest.fn().mockImplementation(() => true),
    saveAndEncryptKey: jest.fn(),
    deleteKey: jest.fn(),
  };
});

import { deleteKey, saveAndEncryptKey } from "../utils";
import { addKey, handleLogs, removeKey } from "../actions";
import { writeFile, unlink } from "node:fs/promises";

const log = jest.spyOn(console, "log").mockImplementation(() => {});

const expectedJSON = `[
  {
    "code": "404"
  }
]`;

describe("actions", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("apiKey", () => {
    it("should be able to save a key to disk", async () => {
      await addKey({ key: "test-key" });
      expect(saveAndEncryptKey).toHaveBeenCalledWith("test-key");
    });

    it("should be able to remove a key", async () => {
      await removeKey();
      expect(deleteKey).toHaveBeenCalled();
    });
  });

  describe("logs", () => {
    let logs;

    beforeEach(async () => {
      logs = [{ code: "404" }];
      await writeFile("basePath/error.log", JSON.stringify(logs));
    });

    it("should error if not format given", async () => {
      await handleLogs({});
      expect(log).toHaveBeenNthCalledWith(
        1,
        "✖",
        " Unknown log format: undefined",
      );
    });

    it("should handle plain text logs", async () => {
      await handleLogs({ format: "plain" });
      expect(log).toHaveBeenNthCalledWith(2, '[{"code":"404"}]');
    });

    it("should handle plain text json", async () => {
      await handleLogs({ format: "json" });
      expect(log).toHaveBeenNthCalledWith(3, expectedJSON);
    });

    it("should be able to clear the logs", async () => {
      await handleLogs({ format: "json", clear: true });
      expect(unlink).toHaveBeenCalledWith("basePath/error.log");
    });
  });
});
