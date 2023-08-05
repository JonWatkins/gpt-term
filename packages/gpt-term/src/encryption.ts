import crypto from "crypto";
import { KEY, SECRET } from "./config";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(String(KEY))
  .digest("base64")
  .slice(0, 32);

const secret = crypto
  .createHash("sha256")
  .update(String(SECRET))
  .digest("base64")
  .slice(0, 16);

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, secret);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (text: string): string => {
  const encryptedText = Buffer.from(text, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, secret);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
