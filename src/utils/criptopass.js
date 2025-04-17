import bcrypt from 'bcryptjs';

const saltRounds = 10;

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch(err) {
    throw new Error('Falha ao criptografar');
  }
}

export async function checkPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}