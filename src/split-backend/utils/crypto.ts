import * as crypto from 'crypto';

const algorithm = 'aes-256-gcm'; // Update the algorithm to AES-256-GCM
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 12; // Recommended IV length for GCM

const key = crypto
  .createHash('sha256')
  .update(String(ENCRYPTION_KEY))
  .digest()
  .slice(0, 32); // Use the full digest (32 bytes) for AES-256

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV for each encryption

  const cipher = crypto.createCipheriv(algorithm, key, iv) as crypto.CipherGCM; // Explicitly cast to CipherGCM

  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag(); // Get the authentication tag

  // Return encrypted data, IV, and authTag as base64
  return `${iv.toString('base64')}:${encrypted}:${authTag.toString('base64')}`;
}

function decrypt(encryptedText: string): string {
  const [iv, encrypted, authTag] = encryptedText
    .split(':')
    .map((part) => Buffer.from(part, 'base64'));

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    iv
  ) as crypto.DecipherGCM; // Explicitly cast to DecipherGCM
  decipher.setAuthTag(authTag); // Set the authentication tag

  // Call update with Buffer directly and specify output encoding as 'utf8'
  let decrypted = decipher.update(encrypted, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export { encrypt, decrypt };
