import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_SEARCH_SECRET ||
  "your-fallback-secret-key-change-this";

export const encryptSearchParams = (data) => {
  try {
    const text = JSON.stringify(data);
    // Encrypt and convert to URL-safe base64
    const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    // Make it URL-safe by replacing characters
    return encodeURIComponent(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    // Fallback to base64 encoding if encryption fails
    return encodeURIComponent(btoa(JSON.stringify(data)));
  }
};

export const decryptSearchParams = (cipher) => {
  try {
    if (!cipher) return null;

    // First, decode the URL component
    const decoded = decodeURIComponent(cipher);

    try {
      // Try to decrypt
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error("Decryption failed");
      }

      return JSON.parse(decrypted);
    } catch (cryptoError) {
      console.error(
        "Crypto decryption failed, trying base64 fallback:",
        cryptoError,
      );

      // Fallback: try base64 decode
      try {
        return JSON.parse(atob(decoded));
      } catch {
        // If that fails, try parsing as JSON directly (for debugging)
        try {
          return JSON.parse(decoded);
        } catch {
          throw new Error("All decryption methods failed");
        }
      }
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Helper to check if encryption is working
export const testEncryption = (data) => {
  try {
    const encrypted = encryptSearchParams(data);
    const decrypted = decryptSearchParams(encrypted);
    console.log("Encryption test:", {
      original: data,
      encrypted,
      decrypted,
      matches: JSON.stringify(data) === JSON.stringify(decrypted),
    });
    return decrypted;
  } catch (error) {
    console.error("Encryption test failed:", error);
    return null;
  }
};
