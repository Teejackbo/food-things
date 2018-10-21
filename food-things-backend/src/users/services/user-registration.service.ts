import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { SecurityService } from '../../security/services/security.service';
import { RegisterUserDTO } from '../dto/register.dto';

/**
 * A service to handle user registration.
 * @property _userRepository - The repository for interacting with the user's table.
 * @property _securityService - An instance of the SecurityService, injected by Nest.
 */
@Injectable()
export class UserRegistrationService {
  /**
   * The constructor for the UserRegistrationService.
   * @constructor
   * @param _userRepository The repository for interacting with the user's table.
   * @param _securityService An instance of the SecurityService, injected by Nest.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _securityService: SecurityService,
  ) {}

  /**
   * Stores a user in the database.
   * @async
   * @public
   * @example await this._usersService.register(user);
   * @param data The user's data to store.
   * @returns The record that was saved.
   */
  async register(userData: RegisterUserDTO): Promise<UserEntity> {
    const user = await this._userRepository.create(userData);
    user.token = await this._securityService.generateString(20);
    const savedUser = await this._userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }
}
