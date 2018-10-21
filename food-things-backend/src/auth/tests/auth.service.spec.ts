import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserEntity } from '../../users/tests/user.mock';
import { AuthService } from '../services/auth.service';
import { SecurityService } from '../../security/services/security.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        SecurityService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
        {
          provide: 'UsersService',
          useClass: UsersService,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });
  it('Should be defined.', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    const user = {
      first_name: 'Jack',
      last_name: 'Coldrick',
      email: 'jcldrk@gmail.com',
      username: 'jack',
      password: 'password',
      token: 'abc123',
    };

    it('Should return a user if the correct token is passed.', async () => {
      jest
        .spyOn(usersService, 'findOneByToken')
        .mockImplementation(token => (token === user.token ? user : null));

      const result = await authService.validateUser('abc123');
      expect(result).toBe(user);
    });

    it('Should return null if an incorrect token is passed.', async () => {
      jest
        .spyOn(usersService, 'findOneByToken')
        .mockImplementation(token => (token === user.token ? user : null));

      const result = await authService.validateUser('incorrect token');
      expect(result).toBe(null);
    });
  });
});
