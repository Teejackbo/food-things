import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';
import { User } from '../user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { RequireAuth } from '../../auth/require-auth.decorator';
import { Validate } from '../../security/validate.decorator';

/**
 * Controller for user authentication functionality such as logging in/out.
 * Registered in controllers property of UsersModule.
 * @example controllers: [UsersController, ...controllers],
 * @property _userAuthenticationService - An instance of the UserAuthenticationService, injected by Nest.
 */
@Controller('users')
export class UserAuthenticationController {
  /**
   * The constructor for the UsersController. Used to inject the UsersService.
   * @constructor
   * @param _userAuthenticationService An instance of the UserAuthenticationService, injected by Nest.
   */
  constructor(
    private readonly _userAuthenticationService: UserAuthenticationService,
  ) {}

  /**
   * A controller method to handle a POST request to /users/login.
   * @async
   * @param userData The object of user data to log in with.
   * @returns The authorised user.
   */
  @Post('login')
  @HttpCode(200)
  @Validate()
  async login(@Body() userData: LoginDTO): Promise<UserEntity> {
    return this._userAuthenticationService.login(userData);
  }

  /**
   * A controller method to handle a GET request to /users/logout.
   * @async
   * @param user The authenticated user, taken from the request object.
   */
  @Get('logout')
  @RequireAuth()
  async logout(@User() user: UserEntity): Promise<void> {
    await this._userAuthenticationService.logout(user);
  }
}
