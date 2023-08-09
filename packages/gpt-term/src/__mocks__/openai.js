module.exports = {
  Configuration: jest.fn().mockImplementation((config) => {
    return {
      ...config,
    };
  }),
  OpenAIApi: jest.fn().mockImplementation((config) => {
    return {
      createChatCompletion: jest.fn(async (options) => {
        if (config.apiKey !== "123456") {
          throw new Error(
            "Incorrect API key provided: test. You can find your API key at https://platform.openai.com/account/api-keys.",
          );
        }

        if (options.temperature > 2) {
          throw new Error(
            `${options.temperature} is greater than the maximum of 2 - 'temperature'`,
          );
        } else if (options.temperature < 0) {
          throw new Error(
            `${options.temperature} is less than the minimum of 0 - 'temperature'`,
          );
        }

        return {
          data: {
            choices: [
              {
                message: {
                  role: "assistant",
                  content: "Hello how can I help?",
                },
              },
            ],
          },
        };
      }),
    };
  }),
};
