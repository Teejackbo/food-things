import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAuthenticationController } from '../controllers/user-authentication.controller';
import { UserEntity } from '../entities/user.entity';
import { SecurityService } from '../../security/services/security.service';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { MockUserEntity } from './user.mock';
import { UserDoesntExistPipe } from '../pipes/user-doesnt-exist.pipe';

describe('UserAuthenticationController', () => {
  let module: TestingModule;
  let userAuthenticationController: UserAuthenticationController;
  let userAuthenticationService: UserAuthenticationService;
  let usersRepo;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserAuthenticationController],
      providers: [
        SecurityService,
        UserAuthenticationService,
        UserDoesntExistPipe,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: MockUserEntity,
        },
      ],
    }).compile();
    userAuthenticationController = module.get<UserAuthenticationController>(
      UserAuthenticationController,
    );
    userAuthenticationService = module.get<UserAuthenticationService>(
      UserAuthenticationService,
    );
    usersRepo = module.get('UserEntityRepository');
  });
  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  it('Should be defined', () => {
    expect(userAuthenticationController).toBeDefined();
  });

  describe('login', () => {
    it('Should return the authenticated user.', async () => {
      const credentials = { username: user.username, password: user.password };
      jest
        .spyOn(userAuthenticationService, 'login')
        .mockImplementation(() => user);
      const result = await userAuthenticationController.login(credentials);
      expect(result).toBe(user);
    });
  });

  describe('logout', () => {
    it('Should change the users token.', async () => {
      const originalToken = user.token;
      jest.spyOn(userAuthenticationService, 'logout').mockImplementation(() => {
        user.token = 'new token';
      });
      const result = await userAuthenticationController.logout(user as any);
      expect(user.token).not.toBe(originalToken);
      user.token = originalToken;
    });

    it('Shouldnt return anything.', async () => {
      const originalToken = user.token;
      jest.spyOn(userAuthenticationService, 'logout').mockImplementation(() => {
        user.token = 'new token';
      });
      const result = await userAuthenticationController.logout(user as any);
      expect(result).toBe(undefined);
      user.token = originalToken;
    });
  });
});
