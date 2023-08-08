jest.mock("../utils", () => {
  const original = jest.requireActual("../utils");
  const characters: string[] = [];
  return {
    ...original,
    characters,
    writeCharacter: jest.fn().mockImplementation((character: string) => {
      characters.push(character);
    }),
  };
});

// We need to ignore on this import as the characters is not actually part of the
// exported module, they come from the mock this is just to be able to check the
// output from the writeCharacter method easier.
// @ts-ignore
import { writeCharacter, characters } from "../utils";
import { systemResponse, assistantResponse } from "../responseHandler";

const log = jest.spyOn(console, "log").mockImplementation(() => {});

describe("responseHandler", () => {
  afterAll(() => {
    jest.resetAllMocks();
    log.mockRestore();
  });

  describe("systemResponse", () => {
    it("should not output a message if shouldLog is false", () => {
      systemResponse("Hello World");
      expect(log).not.toHaveBeenCalled();
    });

    it("should log a message of shouldLog is true", () => {
      systemResponse("Hello World", true);
      expect(log).toHaveBeenCalledWith("Hello World");
    });
  });

  describe("assistantResponse", () => {
    it("should write a reponse", async () => {
      await assistantResponse("Hello World");
      expect(writeCharacter).toHaveBeenCalledTimes(32);
      expect(characters.join("")).toContain("Hello World");
    });
  });
});
