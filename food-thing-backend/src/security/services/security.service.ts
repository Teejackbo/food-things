import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { randomBytes } from 'crypto';

/**
 * A service to provide common security services, such as hashing passwords and generating random strings.
 */
@Injectable()
export class SecurityService {
  /**
   * Hashes a string that is provided.
   * @async
   * @param data The string to hash.
   * @returns The hashed string.
   */
  async hash(data: string): Promise<string> {
    return hash(data, 10);
  }

  /**
   * Compares a string with a hash.
   * @async
   * @param data The string to compare with the hash.
   * @param hashedValue The hash to check against.
   * @returns Boolean representing if the string matches the hash.
   */
  async compare(data: string, hashedValue: string): Promise<boolean> {
    return compare(data, hashedValue);
  }

  /**
   * Generates a random string, default length 10.
   * @param length - The length of the string to generate.
   * @returns The randomnly generated string.
   */
  generateString(length: number = 10): string {
    return randomBytes(Math.floor(length / 2)).toString('hex');
  }
}
