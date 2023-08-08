import { encrypt, decrypt } from "../encryption";

describe("Crypto Module Tests", () => {
  const testText = "This is a test message.";

  it("should encrypt and decrypt text correctly", () => {
    const encrypted = encrypt(testText);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(testText);
  });

  it("should handle empty input for encryption and decryption", () => {
    const emptyText = "";

    const encrypted = encrypt(emptyText);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(emptyText);
  });

  it("should handle special characters and symbols", () => {
    const specialText = "!@#$%^&*()_+1234567890-=~`[]{}|;':,.<>?/";

    const encrypted = encrypt(specialText);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(specialText);
  });

  it("should handle long texts", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const encrypted = encrypt(longText);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(longText);
  });
});
