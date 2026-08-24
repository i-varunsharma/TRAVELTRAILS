import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// Turns a plain-text password into a hash that's safe to store in the database.
export function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

// Checks a plain-text password against a stored bcrypt hash.
export function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
