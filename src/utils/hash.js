import bcrypt from 'bcrypt';
import { env } from './env';

export function hash(stringToHash) {
  try {
    if (!stringToHash) {
      throw new Error('Need inform stringToHash');
    }

    return bcrypt.hashSync(stringToHash, env.HASH_SALT);
  } catch (err) {
    throw new Error(err);
  }
}
