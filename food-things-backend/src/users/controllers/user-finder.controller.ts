import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserQueryableFields } from '../user-queryable-fields';

@Controller('users')
export class UserFinderController {
  constructor(private readonly _usersService: UsersService) {}

  @Get('find')
  async find(@Query() query: UserQueryableFields) {
    const user = await this._usersService.find(query);
    if (!user) throw new NotFoundException('Could not find this user.');

    return user;
  }
}
