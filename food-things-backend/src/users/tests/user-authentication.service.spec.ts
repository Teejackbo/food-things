import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { SecurityService } from '../../security/services/security.service';
import { UserEntity } from '../entities/user.entity';
import { MockUserEntity } from './user.mock';

describe('UserAuthenticationService', () => {
  let userAuthenticationService: UserAuthenticationService;
  let usersRepo;
  let securityService: SecurityService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthenticationService,
        SecurityService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();
    userAuthenticationService = module.get<UserAuthenticationService>(
      UserAuthenticationService,
    );
    usersRepo = module.get('UserEntityRepository');
    securityService = module.get<SecurityService>(SecurityService);
  });

  it('Should be defined.', () => {
    expect(userAuthenticationService).toBeDefined();
  });

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  describe('login', () => {
    it('Should throw an error if the user cannot be found.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(() => null);
      let result;
      try {
        await userAuthenticationService.login({
          username: 'wrong',
          password: 'wrong',
        });
      } catch (e) {
        result = e;
      }
      expect(result).toBeTruthy();
    });

    it('Should throw an error if the password sent in credentials does not match.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(async () => ({
        ...user,
        password: await securityService.hash(user.password),
      }));
      let result;
      try {
        await userAuthenticationService.login({
          username: 'jack',
          password: 'wrong',
        });
      } catch (e) {
        result = e;
      }
      expect(result).toBeTruthy();
    });

    it('Should return the authenticated user if credentials match.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(async () => ({
        ...user,
        password: await securityService.hash(user.password),
      }));
      const result = await userAuthenticationService.login({
        username: 'jack',
        password: 'password',
      });
      expect(result.email).toBe(user.email);
    });
  });

  describe('logout', () => {
    it('Should change the token of the user.', async () => {
      const originalToken = user.token;
      jest.spyOn(securityService, 'generateString').mockImplementation(() => {
        user.token = 'new token';
      });
      await userAuthenticationService.logout({
        ...user,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);
      expect(user.token).not.toBe(originalToken);
      user.token = originalToken;
    });
  });

  describe('_refreshToken', () => {
    it('Should change the users token.', async () => {
      const originalToken = user.token;
      jest.spyOn(securityService, 'generateString').mockImplementation(() => {
        user.token = 'new token';
      });
      // tslint:disable-next-line
      await userAuthenticationService['_refreshToken']({
        ...user,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);
      expect(user.token).not.toBe(originalToken);
      user.token = originalToken;
    });
  });
});
