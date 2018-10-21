import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

/**
 * A decorator to get the user from the request object.
 * Example:
 * ```js
 * async logout(@User() user: UserEntity): Promise<void> {}
 * ```
 */
export const User = createParamDecorator((data, req): UserEntity => req.user);
