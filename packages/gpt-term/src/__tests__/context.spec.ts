import fs from "node:fs/promises";
import { fileExists } from "../utils";
import { __dirname } from "../dirname";
import { MAX_HISTORY } from "../config";

import {
  getContext,
  initContext,
  storeContext,
  addContext,
  resetContext,
} from "../context";

jest.mock("../utils", () => {
  const original = jest.requireActual("../utils");
  return {
    ...original,
    fileExists: jest.fn().mockImplementation(() => true),
  };
});

describe("Context", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should be able to return the context", () => {
    expect(Array.isArray(getContext())).toEqual(true);
  });

  it("should be able to add a message to the context", () => {
    addContext({ role: "user", content: "Hello" });
    expect(getContext().length).toEqual(1);
  });

  it("should be able to reset the context", () => {
    expect(getContext().length).toEqual(1);
    resetContext();
    expect(getContext().length).toEqual(0);
  });

  it("should push out older messages once the cap is reached", () => {
    let i = 1;

    while (i <= MAX_HISTORY) {
      addContext({ role: "user", content: `Hello ${i++}` });
    }

    const ctx = getContext();
    expect(ctx.length).toEqual(10);
    expect(ctx[0].content).toEqual("Hello 1");

    addContext({ role: "user", content: `Hello ${++i}` });

    const ctx1 = getContext();
    expect(ctx1.length).toEqual(10);
    expect(ctx1[0].content).toEqual("Hello 2");
  });

  describe("saved state", () => {
    let contextPath: string;

    beforeAll(() => {
      contextPath = `${__dirname}/context.text`;
    });

    beforeEach(() => {
      resetContext();
    });

    it("should be able to write the context to disk", async () => {
      let i = 1;

      while (i <= MAX_HISTORY) {
        addContext({ role: "user", content: `Hello ${i++}` });
      }

      await storeContext();
      expect(fs.writeFile).toHaveBeenCalledWith(
        contextPath,
        JSON.stringify(getContext()),
      );
    });

    it("should be able to read the saved context from disk", async () => {
      await initContext(false);
      expect(fileExists).toHaveBeenCalledWith(contextPath);
      expect(fileExists).toBeCalledTimes(1);
      expect(fs.readFile).toHaveBeenCalledWith(contextPath, "utf-8");
      expect(fs.readFile).toBeCalledTimes(1);
      expect(getContext()[0].role).toEqual("user");
      expect(getContext()[0].content).toEqual("Hello 1");
    });

    it("should not get from disk when told to reset the context", async () => {
      await initContext(true);
      expect(fileExists).toBeCalledTimes(1); // this call is from the prev test
      expect(fs.readFile).toBeCalledTimes(1); // this call is from the prev test
      expect(getContext().length).toEqual(0);
    });
  });
});
