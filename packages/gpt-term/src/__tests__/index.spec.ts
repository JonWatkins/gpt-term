import path from "node:path";
import { exec } from "node:child_process";

interface CliResult {
  code: number;
  error: null | string;
  stderr: string;
  stdout: string;
}

function cli(args: Array<string>, cwd: string) {
  return new Promise((resolve) => {
    exec(
      `node ${path.resolve("./packages/gpt-term/index.mjs")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      },
    );
  });
}

describe("CLI", () => {
  it("Should be able to return the help", async () => {
    const result = (await cli(["--help"], ".")) as CliResult;
    expect(result.code).toEqual(0);
    expect(result.error).toEqual(null);
    expect(result.stdout).toContain("Usage: index [options]");
  });

  describe("chat", () => {
    it("Should be able to return the chat help", async () => {
      const result = (await cli(["chat", "--help"], ".")) as CliResult;
      expect(result.code).toEqual(0);
      expect(result.error).toEqual(null);
      expect(result.stdout).toContain("Usage: index chat [options]");
    });
  });

  describe("log", () => {
    it("Should be able to return the chat help", async () => {
      const result = (await cli(["logs", "--help"], ".")) as CliResult;
      expect(result.code).toEqual(0);
      expect(result.error).toEqual(null);
      expect(result.stdout).toContain("Usage: index logs [options]");
    });
  });
});
