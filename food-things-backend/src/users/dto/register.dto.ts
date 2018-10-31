import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/**
 * The DTO for registering a user.
 * @property first_name - The user's first name.
 * @property last_name - The user's last name.
 * @property email - The user's email.
 * @property username - The user's username.
 * @property password - The user's password.
 */
export class RegisterUserDTO {
  /**
   * The user's first name.
   * @readonly
   * @public
   */
  @IsNotEmpty({ message: 'Please enter a first name.' })
  readonly first_name: string;

  /**
   * The user's last name.
   * @readonly
   * @public
   */
  @IsNotEmpty({ message: 'Please enter a last name.' })
  readonly last_name: string;

  /**
   * The user's email.
   * @readonly
   * @public
   */
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Please enter an email address.' })
  readonly email: string;

  /**
   * The user's username.
   * @readonly
   * @public
   */
  @IsNotEmpty({ message: 'Please enter a username.' })
  readonly username: string;

  /**
   * The user's password.
   * @readonly
   * @public
   */
  @Length(5, 1000, {
    message: 'Your password must be at least 5 characters long.',
  })
  readonly password: string;
}
