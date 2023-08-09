import ora from "ora";

import {
  spinnerStart,
  spinnerSucceed,
  spinnerFail,
  loadingSpinner,
} from "../spinner";

describe("loading spinner", () => {
  it("should be able to start the loading spinner", () => {
    spinnerStart();
    expect(ora).toHaveBeenCalled();
    expect(loadingSpinner.start).toHaveBeenCalled();
  });

  it("should be able to succeed the loading spinner", () => {
    spinnerSucceed();
    expect(ora).toHaveBeenCalled();
    expect(loadingSpinner.succeed).toHaveBeenCalled();
  });

  it("should be able to fail the loading spinner", () => {
    spinnerFail("Ooops it broke");
    expect(ora).toHaveBeenCalled();
    expect(loadingSpinner.fail).toHaveBeenCalledWith("Ooops it broke");
  });
});
