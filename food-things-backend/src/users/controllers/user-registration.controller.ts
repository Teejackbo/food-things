import { Controller, Post, Body } from '@nestjs/common';
import { UserRegistrationService } from '../services/user-registration.service';
import { PasswordHashingPipe } from '../../security/pipes/password-hashing.pipe';
import { UserDoesntExistPipe } from '../pipes/user-doesnt-exist.pipe';
import { RegisterUserDTO } from '../dto/register.dto';
import { UserEntity } from '../entities/user.entity';
import { Validate } from '../../security/validate.decorator';

/**
 * A controller to manage registration of users. Used in the UsersModule.
 * @example controllers: [UserRegistrationController, ...controllers]
 * @property _userRegistrationService - An instance of the UserRegistrationService, injected by Nest.
 */
@Controller('users')
export class UserRegistrationController {
  /**
   * The constructor for the UsersController. Used to inject the UsersService.
   * @constructor
   * @param _userRegistrationService An instance of the UserRegistrationService, injected by Nest.
   */
  constructor(
    private readonly _userRegistrationService: UserRegistrationService,
  ) {}

  /**
   * A controller method to handle a POST request to /users/register.
   * @async
   * @param userData The object of user data to store.
   * @return The data stored in the database, as an object.
   */
  @Post('register')
  @Validate()
  async register(
    @Body(PasswordHashingPipe, UserDoesntExistPipe)
    userData: RegisterUserDTO,
  ): Promise<UserEntity> {
    return this._userRegistrationService.register(userData);
  }
}
