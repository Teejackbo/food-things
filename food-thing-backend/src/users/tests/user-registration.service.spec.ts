import { Test, TestingModule } from '@nestjs/testing';
import { UserRegistrationService } from '../services/user-registration.service';
import { SecurityService } from '../../security/services/security.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { MockUserEntity } from './user.mock';

describe('UserRegistrationService', () => {
  let userRegistrationService: UserRegistrationService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegistrationService,
        SecurityService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();
    userRegistrationService = module.get<UserRegistrationService>(
      UserRegistrationService,
    );
  });
  it('Should be defined.', () => {
    expect(userRegistrationService).toBeDefined();
  });

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  describe('register', () => {
    it('Should return a new user, the same as what was passed in.', async () => {
      const result = await userRegistrationService.register(user);
      expect(result).toBe(user);
    });
  });
});
