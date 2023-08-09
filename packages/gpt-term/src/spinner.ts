import { ASSISTANT } from "./config";
import ora from "ora";

export const loadingSpinner = ora(`${ASSISTANT} Thinking...`);

export const spinnerStart = (): void => {
  loadingSpinner.start();
};

export const spinnerSucceed = (): void => {
  loadingSpinner.succeed();
};

export const spinnerFail = (message: string): void => {
  loadingSpinner.fail(message);
};
