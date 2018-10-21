import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';

/**
 * A strategy to handle authentication.
 * @property _authService An instance of the AuthService, to find a user by a token. Injected by Nest.
 */
@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor for the HttpStrategy.
   * @constructor
   * @param _authService Instance of AuthService. Injected by Nest.
   * @param done Function called when the user is authenticated. Handled by Nest.
   */
  constructor(private readonly _authService: AuthService) {
    super();
  }

  /**
   * Validates a token that is provided by the user.
   * @async
   * @throws Throws an UnauthorizedException if the user is not able to be authenticated.
   * @param token The token to authenticate.
   */
  async validate(token: string, done: Function): Promise<void> {
    const user = await this._authService.validateUser(token);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
