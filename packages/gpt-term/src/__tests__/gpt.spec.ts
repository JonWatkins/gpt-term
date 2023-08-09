jest.mock("../spinner", () => {
  return {
    spinnerStart: jest.fn(),
    spinnerSucceed: jest.fn(),
  };
});

import { getResponse } from "../gpt";
import { CliChatOptions } from "../utils";
import { spinnerStart, spinnerSucceed } from "../spinner";

import {
  DEFAULT_MODEL,
  DEFAULT_TEMP,
  DEFAULT_MAX_TOKENS,
  DEFAULT_PRESENCE_PENALTY,
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_SYSTEM_PROMPT,
} from "../config";

const defaultOptions: CliChatOptions = Object.freeze({
  engine: DEFAULT_MODEL,
  temperature: DEFAULT_TEMP,
  verbose: false,
  maxTokens: DEFAULT_MAX_TOKENS,
  presencePenalty: DEFAULT_PRESENCE_PENALTY,
  frequencyPenalty: DEFAULT_FREQUENCY_PENALTY,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  clearHistory: false,
  stop: undefined,
});

describe("gpt", () => {
  const apiKey = "123456";

  it("should throw if given an incorrect apiKey", async () => {
    const request = async () => getResponse("12334", defaultOptions);
    await expect(request).rejects.toThrow(
      "Incorrect API key provided: test. You can find your API key at https://platform.openai.com/account/api-keys.",
    );
    expect(spinnerStart).toHaveBeenCalled();
    expect(spinnerSucceed).not.toHaveBeenCalled();
  });

  it("should throw if the temperature is above 2", async () => {
    const options = { ...defaultOptions };
    options.temperature = "3";
    const request = async () => getResponse(apiKey, options);
    await expect(request).rejects.toThrow(
      "3 is greater than the maximum of 2 - 'temperature'",
    );
    expect(spinnerStart).toHaveBeenCalled();
    expect(spinnerSucceed).not.toHaveBeenCalled();
  });

  it("should throw if the temperature is less than 0", async () => {
    const options = { ...defaultOptions };
    options.temperature = "-1";
    const request = async () => getResponse(apiKey, options);
    await expect(request).rejects.toThrow(
      "-1 is less than the minimum of 0 - 'temperature'",
    );
    expect(spinnerStart).toHaveBeenCalled();
    expect(spinnerSucceed).not.toHaveBeenCalled();
  });

  it("should be able to get a response", async () => {
    const options = { ...defaultOptions };
    const response = await getResponse(apiKey, options);
    expect(response.role).toEqual("assistant");
    expect(response.content).toEqual("Hello how can I help?");
    expect(spinnerStart).toHaveBeenCalled();
    expect(spinnerSucceed).toHaveBeenCalled();
  });

  it("should be able parse the stop sequence", async () => {
    const options = { ...defaultOptions };
    options.stop = "Human:,AI:";
    const response = await getResponse(apiKey, options);
    expect(response.role).toEqual("assistant");
    expect(response.content).toEqual("Hello how can I help?");
    expect(spinnerStart).toHaveBeenCalled();
    expect(spinnerSucceed).toHaveBeenCalled();
  });
});
