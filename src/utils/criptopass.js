import bcrypt from 'bcryptjs'; // Instead of 'bcrypt'

const saltRounds = 10;

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function checkPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}