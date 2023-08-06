import crypto from "crypto";
import { SECRET } from "./config";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(String(SECRET))
  .digest("base64")
  .slice(0, 32);

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (text: string): string => {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift() as string, "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
