import {
  EXIT_CODES,
  VERSION,
  ASSISTANT,
  CHAT_PREFIX,
  WRITE_INTERVAL,
  MAX_HISTORY,
  DEFAULT_MAX_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_MODEL,
  DEFAULT_TEMP,
  DEFAULT_SYSTEM_PROMPT,
  NOT_FOUND_ERROR,
  RATE_EXCEEDED_ERROR,
  BAD_REQUEST_ERROR,
  QUOTA_EXCEEDED_ERROR,
  SEVICE_UNAVAILABLE_ERROR,
  DEFAULT_ERROR,
  KEY_FILE,
  SECRET,
} from "../config";

describe("Variable Values Test", () => {
  it("should have correct values for EXIT_CODES", () => {
    const expectedExitCodes = ["exit", "quit", "bye"];
    expect(EXIT_CODES).toEqual(expectedExitCodes);
  });

  it("should have correct value for VERSION", () => {
    expect(VERSION).toBe("1.0.1");
  });

  it("should have correct value for ASSISTANT", () => {
    expect(ASSISTANT).toBe("ChatGPT:");
  });

  it("should have correct value for CHAT_PREFIX", () => {
    expect(CHAT_PREFIX).toBe("✔");
  });

  it("should have correct value for WRITE_INTERVAL", () => {
    expect(WRITE_INTERVAL).toBe(10);
  });

  it("should have correct value for MAX_HISTORY", () => {
    expect(MAX_HISTORY).toBe(10);
  });

  it("should have correct value for DEFAULT_MAX_TOKENS", () => {
    expect(DEFAULT_MAX_TOKENS).toBe("2048");
  });

  it("should have correct value for DEFAULT_PRESENCE_PENALTY", () => {
    expect(DEFAULT_PRESENCE_PENALTY).toBe("0");
  });

  it("should have correct value for DEFAULT_FREQUENCY_PENALTY", () => {
    expect(DEFAULT_FREQUENCY_PENALTY).toBe("0");
  });

  it("should have correct value for DEFAULT_MODEL", () => {
    expect(DEFAULT_MODEL).toBe("gpt-3.5-turbo");
  });

  it("should have correct value for DEFAULT_TEMP", () => {
    expect(DEFAULT_TEMP).toBe("0.5");
  });

  it("should have correct value for DEFAULT_SYSTEM_PROMPT", () => {
    const expectedSystemPrompt =
      "You are ChatGPT, a large language model trained by OpenAI, based on " +
      `the GPT-3.5 architecture. Knowledge cutoff: 2021-09 Current date: {currentDate}`;
    expect(DEFAULT_SYSTEM_PROMPT).toBe(expectedSystemPrompt);
  });

  it("should have correct value for NOT_FOUND_ERROR", () => {
    expect(NOT_FOUND_ERROR).toBe(
      "Model not found. Please check the model name.",
    );
  });

  it("should have correct value for RATE_EXCEEDED_ERROR", () => {
    expect(RATE_EXCEEDED_ERROR).toBe("API Rate Limit Exceeded.");
  });

  it("should have correct value for BAD_REQUEST_ERROR", () => {
    expect(BAD_REQUEST_ERROR).toBe(
      "Bad Request: Prompt provided is empty or too long.",
    );
  });

  it("should have correct value for QUOTA_EXCEEDED_ERROR", () => {
    expect(QUOTA_EXCEEDED_ERROR).toBe("API Quota Exceeded");
  });

  it("should have correct value for SEVICE_UNAVAILABLE_ERROR", () => {
    expect(SEVICE_UNAVAILABLE_ERROR).toBe("Service Unavailable");
  });

  it("should have correct value for DEFAULT_ERROR", () => {
    expect(DEFAULT_ERROR).toBe("Unable to process request");
  });

  it("should have correct value for KEY_FILE", () => {
    expect(KEY_FILE).toBe("key.txt");
  });

  it("should have correct value for SECRET", () => {
    expect(SECRET).toBe(
      "d139c8f475208eb70e0b8649e72164a7fa84bf3d3b84194dd72055a11ba3017a",
    );
  });
});
