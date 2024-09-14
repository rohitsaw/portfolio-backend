//Checking the crypto module
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV = process.env.IV;

const key = crypto
  .createHash('sha256')
  .update(String(ENCRYPTION_KEY))
  .digest('base64')
  .substr(0, 32);

const iv = crypto
  .createHash('sha256')
  .update(String(IV))
  .digest('base64')
  .substr(0, 16);

function encrypt(text: string): string {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(text: string): string {
  let encryptedText = text;

  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
