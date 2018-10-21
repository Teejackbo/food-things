import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../dto/register.dto';

/**
 * Pipe to validate if a username and email are taken.
 * @property _userRepository - The repository for interacting with the users table.
 * Example:
 * ```js
 * async register(@Body(UserDoesntExistPipe) userData: RegisterUserDTO) {}
 * ```
 */
@Injectable()
export class UserDoesntExistPipe implements PipeTransform {
  /**
   * Method to inject the UserRepository for use in the transform method.
   * @constructor
   * @param _userRepository An instance of the UserRepository, injected by Nest.
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Checks that email and username in RegisterUserDTO are available.
   * @async
   * @throws Throws conflict exception to return correct response if the username or email are taken.
   * @param userData The data to validate. Should be an instance of RegisterUserDTO.
   * @param metadata Nest's Argument Metadata.
   * @returns The original data, if validation has passed.
   */
  async transform(userData: RegisterUserDTO, metadata?: ArgumentMetadata) {
    const { email, username }: { email: string; username: string } = userData;
    const emailTaken: boolean = !!(await this._userRepository.findOne({
      where: { email },
    }));
    const usernameTaken: boolean = !!(await this._userRepository.findOne({
      where: { username },
    }));

    if (usernameTaken) {
      throw new ConflictException('This username is already taken.');
    } else if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    return userData;
  }
}
