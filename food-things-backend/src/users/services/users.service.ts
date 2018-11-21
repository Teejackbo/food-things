import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserQueryableFields } from 'users/user-queryable-fields';

/**
 * A service to handle Users. Responsible for managing tokens and user data.
 * Use through Nest's dependency injection.
 * @example constructor(private readonly _usersService: UsersService) {}
 * @property _userRepository - The repository for interacting with the users table.
 */
@Injectable()
export class UsersService {
  /**
   * The constructor for the UsersService.
   * @constructor
   * @private
   * @param _userRepository The repository for interacting with the users table.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  /**
   * A method to find a user by a token that is passed in.
   * @async
   * @public
   * @example await this._usersService.findOneByToken(token);
   * @param token - The API token to find a user by.
   * @returns The user that was found.
   */
  async findOneByToken(
    token: string,
    options?: { stripPassword: boolean },
  ): Promise<UserEntity> {
    const user = await this._userRepository.findOne({ where: { token } });
    if (options.stripPassword && user) delete user.password;
    return user;
  }

  async find(where: UserQueryableFields): Promise<UserEntity> {
    const user = await this._userRepository.findOne({ where });
    if (user) {
      delete user.password;
      delete user.token;
    }

    return user;
  }
}
