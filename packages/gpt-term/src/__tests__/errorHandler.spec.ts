import { fetchLogs, clearLogs, dumpLogs, parseError } from "../errorHandler";
import { writeFile, unlink } from "node:fs/promises";
import { DEFAULT_ERROR } from "../config";

const log = jest.spyOn(console, "log").mockImplementation(() => {});

const expectedJSON = `[
  {
    "code": "404"
  }
]`;

describe("errorHandler", () => {
  let logs;

  describe("logs", () => {
    beforeEach(async () => {
      logs = [{ code: "404" }];
      await writeFile("basePath/error.log", JSON.stringify(logs));
    });

    afterEach(async () => {
      await unlink("basePath/error.log");
    });

    afterAll(() => {
      jest.resetAllMocks();
      log.mockRestore();
    });

    it("should be able to get logs", async () => {
      expect(await fetchLogs()).toEqual('[{"code":"404"}]');
    });

    it("should not get the logs if none exist", async () => {
      await unlink("basePath/error.log");
      expect(await fetchLogs()).toEqual("No logs found");
    });

    it("should not dump logs without a format", async () => {
      await dumpLogs(await fetchLogs(), {});
      expect(log).toHaveBeenNthCalledWith(
        1,
        "✖",
        " Unknown log format: undefined",
      );
    });

    it("should not dump logs with an incorrect format", async () => {
      await dumpLogs(await fetchLogs(), { format: "test" });
      expect(log).toHaveBeenNthCalledWith(2, "✖", " Unknown log format: test");
    });

    it("should be able to dump the logs as plain text", async () => {
      await dumpLogs(await fetchLogs(), { format: "plain" });
      expect(log).toHaveBeenNthCalledWith(3, '[{"code":"404"}]');
    });

    it("should be able to dump the logs as json", async () => {
      await dumpLogs(await fetchLogs(), { format: "json" });
      expect(log).toHaveBeenNthCalledWith(4, expectedJSON);
    });

    it("should be able to remove the logs", async () => {
      await clearLogs();
      expect(await fetchLogs()).toEqual("No logs found");
    });
  });

  describe("parseError", () => {
    it("should return a default error", () => {
      expect(parseError({})).toEqual(DEFAULT_ERROR);
    });

    it("should return a default error", () => {
      const expected = "Ooops something broke!";
      expect(parseError({ message: expected })).toEqual(expected);
    });

    describe("openai error", () => {
      it("should handle an open ai error response", () => {
        const err = {
          response: {
            data: {
              error: {
                message: "Incorrect API key provided",
              },
            },
          },
        };
        expect(parseError(err)).toEqual("Incorrect API key provided");
      });

      it("should handle the open ai reponse with missing message", () => {
        const err = {
          response: {
            data: {
              error: {},
            },
          },
        };
        expect(parseError(err)).toEqual(DEFAULT_ERROR);
      });

      it("should handle the open ai reponse with missing error", () => {
        const err = {
          response: {
            data: {},
          },
        };
        expect(parseError(err)).toEqual(DEFAULT_ERROR);
      });

      it("should handle the open ai reponse with missing error", () => {
        const err = {
          response: {},
        };
        expect(parseError(err)).toEqual(DEFAULT_ERROR);
      });
    });
  });
});
