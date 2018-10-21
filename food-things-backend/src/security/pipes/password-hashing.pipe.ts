import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';
import { SecurityService } from '../services/security.service';

/**
 * A pipe to hash a password.
 * @property _securityService - An instance of the security service. Injected by Nest.
 */
@Injectable()
export class PasswordHashingPipe implements PipeTransform {
  /**
   * The constructor for the PasswordHashingPipe.
   * @constructor
   * @param _securityService - An instance of the security service. Injected by Nest.
   */
  constructor(private readonly _securityService: SecurityService) {}

  /**
   * Hashes the password.
   * @async
   * @param value The value to hash. Either an object or string.
   * @param metadata Pipe metadata provided by Nest.
   * @returns The object with the hashed password.
   */
  async transform(value: any, metadata?: ArgumentMetadata) {
    if (value === null) return value;
    if (typeof value === 'object' && value.password) {
      const hash = await this._securityService.hash(value.password);
      return Object.assign(value, { password: hash });
    }
    if (typeof value === 'string') {
      const hash = await this._securityService.hash(value);
      return hash;
    }
    return value;
  }
}
