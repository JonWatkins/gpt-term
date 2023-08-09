import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFiles: ["<rootDir>/packages/gpt-term/src/__mocks__/setup.js"],
  moduleNameMapper: {
    chalk: "<rootDir>/packages/gpt-term/src/__mocks__/chalk.js",
    ora: "<rootDir>/packages/gpt-term/src/__mocks__/ora.js",
    winston: "<rootDir>/packages/gpt-term/src/__mocks__/winston.js",
    inquirer: "<rootDir>/packages/gpt-term/src/__mocks__/inquirer.js",
    openai: "<rootDir>/packages/gpt-term/src/__mocks__/openai.js",
    "node:fs/promises": "<rootDir>/packages/gpt-term/src/__mocks__/fs.js",
    "./dirname": "<rootDir>/packages/gpt-term/src/__mocks__/dirname.js",
  },
};

export default config;
