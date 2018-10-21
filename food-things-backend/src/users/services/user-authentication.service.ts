import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SecurityService } from '../../security/services/security.service';
import { LoginDTO } from '../dto/login.dto';

/**
 * A service to handle user authentication.
 * @property _userRepository - The repository for interacting with the users table.
 * @property _securityService - An instance of the SecurityService, used to hash and compare passwords. Injected by Nest.
 */
@Injectable()
export class UserAuthenticationService {
  /**
   * The constructor for the UserAuthenticationService.
   * @constructor
   * @private
   * @param _userRepository The repository for interacting with the users table.
   * @param _securityService An instance of the SecurityService, used to hash and compare passwords. Injected by Nest.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _securityService: SecurityService,
  ) {}

  /**
   * A method to refresh an API token of a user.
   * @async
   * @private
   * @example await this._refreshToken(user);
   * @param user - An instance of the UserEntity.
   * @returns The user that was passed in, with a new token.
   */
  private async _refreshToken(user: UserEntity): Promise<UserEntity> {
    user.token = await this._securityService.generateString(20);
    return this._userRepository.save(user);
  }

  /**
   * A method to get a user, assuming the right credentials are entered.
   * @async
   * @public
   * @example await this._userAuthenticationService.login(credentials);
   * @throws Throws UnauthorizedException if the user cannot be authenticated.
   * @param credentials The login credentials.
   * @returns The user that was authenticated.
   */
  async login(credentials: LoginDTO): Promise<UserEntity> {
    const { username, password } = credentials;
    const user = await this._userRepository.findOne({
      where: { username },
    });
    if (!user) throw new UnauthorizedException('Your username is incorrect.');
    const authorised: boolean = await this._securityService.compare(
      password,
      user.password,
    );
    if (!authorised) {
      throw new UnauthorizedException('Your password is incorrect.');
    }
    delete user.password;
    return user;
  }

  /**
   * A method to log out a user. Refreshes their API token so they have to authenticate again.
   * @async
   * @public
   * @example await this._userAuthenticationService.logout(user);
   * @param user The user to log out.
   */
  async logout(user: UserEntity): Promise<void> {
    await this._refreshToken(user);
  }
}
