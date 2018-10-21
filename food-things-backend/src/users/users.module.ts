import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';
import { UserAuthenticationController } from './controllers/user-authentication.controller';
import { UserRegistrationController } from './controllers/user-registration.controller';
import { UserEntity } from './entities/user.entity';
import { UserDoesntExistPipe } from './pipes/user-doesnt-exist.pipe';
import { UserAuthenticationService } from './services/user-authentication.service';
import { UserRegistrationService } from './services/user-registration.service';
import { UsersService } from './services/users.service';

/**
 * The UsersModule. Handles everything to do with users.
 */
@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UsersService,
    UserRegistrationService,
    UserAuthenticationService,
    UserDoesntExistPipe,
  ],
  exports: [UsersService],
  controllers: [UserAuthenticationController, UserRegistrationController],
})
export class UsersModule {}
