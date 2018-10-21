import { Module } from '@nestjs/common';
import { SecurityService } from './services/security.service';
import { PasswordHashingPipe } from './pipes/password-hashing.pipe';

/**
 * The SecurityModule. Contains all things to do with security, such as hashing passwords.
 */
@Module({
  providers: [SecurityService, PasswordHashingPipe],
  exports: [SecurityService, PasswordHashingPipe],
})
export class SecurityModule {}
