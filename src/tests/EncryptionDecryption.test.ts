import { describe, it, expect } from "vitest";
import DeriveKey from "../utils/DeriveKey";
import EncryptBuffer from "../utils/EncryptBuffer";
import DecryptBuffer from "../utils/DecryptBuffer";

describe("EncryptionDecryption", () => {
  it("Encrypt and decrypt a string", async () => {
    const text = "Hello World";
    const encoder = new TextEncoder();
    const buffer = encoder.encode(text).buffer;

    const key = await DeriveKey("password123", "salt123", 10);

    const { encryptedBuffer, iv } = await EncryptBuffer(buffer, key);

    const decrypted = await DecryptBuffer(encryptedBuffer, iv, key);
    expect(decrypted).toStrictEqual(buffer);
  });
});

it("Encrypt and decrypt a buffer", async () => {
  const key = await DeriveKey("password123", "salt123", 10);

  const buffer = new ArrayBuffer(10);
  const view = new Uint8Array(buffer);
  crypto.getRandomValues(view);

  const { encryptedBuffer, iv } = await EncryptBuffer(buffer, key);

  const decrypted = await DecryptBuffer(encryptedBuffer, iv, key);
  expect(decrypted).toStrictEqual(buffer);
});
