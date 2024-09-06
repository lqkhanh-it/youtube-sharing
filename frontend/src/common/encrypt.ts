import bcrypt from 'bcryptjs';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(5);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}
