import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';

/**
 * A service to handle authenticating users.
 * @property _usersService - An instance of the UsersService. Injected by Nest.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor for the AuthService.
   * @constructor
   * @param _usersService An instance of the UsersService, to find a user. Injected by Nest.
   */
  constructor(private readonly _usersService: UsersService) {}

  /**
   * Finds a user by the token they supply.
   * @async
   * @example await this._authService.validateUser(token);
   * @param token The token supplied by the user to be authenticated.
   * @returns The user that was found.
   */
  async validateUser(token: string): Promise<UserEntity> {
    return this._usersService.findOneByToken(token, {
      stripPassword: true,
    });
  }
}
