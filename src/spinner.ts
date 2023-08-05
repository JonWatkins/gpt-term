import { ASSISTANT } from "./config";
import ora from "ora";

export const loadingSpinner = ora(`${ASSISTANT} Thinking...`);
