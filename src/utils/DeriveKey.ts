/**
 * Takes in two strings for password and salt, applies PBKDF2 with given no of iterations and returns a key
 * @param {string} password
 * @param {string} salt
 * @param {number} iterations
 * @returns {Promise<CryptoKey>}
 */

const DeriveKey = async (
  password: string,
  salt: string,
  iterations: number,
): Promise<CryptoKey> => {
  const keybuffer = new TextEncoder().encode(password);

  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    keybuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const saltBuffer = new TextEncoder().encode(salt);

  const finalKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: iterations,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );

  return finalKey;
};
export default DeriveKey;
