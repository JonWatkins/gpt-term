import { deleteKey, saveAndEncryptKey } from "../utils";
import { addKey, removeKey } from "../actions";

jest.mock("../utils", () => {
  const original = jest.requireActual("../utils");
  return {
    ...original,
    fileExists: jest.fn().mockImplementation(() => true),
    saveAndEncryptKey: jest.fn(),
    deleteKey: jest.fn(),
  };
});

describe("actions", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should be able to save a key to disk", async () => {
    await addKey({ key: "test-key" });
    expect(saveAndEncryptKey).toHaveBeenCalledWith("test-key");
  });

  it("should be able to remove a key", async () => {
    await removeKey();
    expect(deleteKey).toHaveBeenCalled();
  });
});
