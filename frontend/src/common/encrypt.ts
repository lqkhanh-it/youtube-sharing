import { Buffer } from 'buffer';

export function hashPassword(password: string) {
  const hashed = Buffer.from(password).toString('base64');
  return hashed;
}
