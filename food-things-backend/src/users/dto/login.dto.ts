import { IsNotEmpty, IsString } from 'class-validator';

/**
 * The data-transfer object for logging in.
 * @public
 * @property username - The user's username.
 * @property password - The user's password.
 */
export class LoginDTO {
  /**
   * The user's username.
   * @readonly
   * @public
   */
  @IsNotEmpty({ message: 'Please enter a username.' })
  @IsString()
  readonly username: string;

  /**
   * The user's password.
   * @readonly
   * @public
   */
  @IsNotEmpty({ message: 'Please enter a password.' })
  @IsString()
  readonly password: string;
}
