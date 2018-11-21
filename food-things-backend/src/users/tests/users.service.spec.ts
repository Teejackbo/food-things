import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { SecurityService } from '../../security/services/security.service';
import { UserEntity } from '../entities/user.entity';
import { MockUserEntity } from './user.mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let securityService: SecurityService;
  let usersRepo;
  let user;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        SecurityService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    securityService = module.get<SecurityService>(SecurityService);
    usersRepo = module.get('UserEntityRepository');
  });

  beforeEach(() => {
    user = {
      id: 1,
      first_name: 'Jack',
      last_name: 'Coldrick',
      email: 'jcldrk@gmail.com',
      username: 'jack',
      password: 'password',
      token: 'abc123',
    };
  });

  it('Should be defined.', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOneByToken', () => {
    it('Should return a user when provided the correct token.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(options => {
        if (!options) return user;
        if (options.where) {
          if (options.where.token === user.token) {
            return user;
          }
        }
        return null;
      });
      const result = await usersService.findOneByToken(user.token, {
        stripPassword: true,
      });

      expect(result).toBe(user);
    });

    it('Should return null when provided an incorrect token.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(options => {
        if (!options) return user;
        if (options.where) {
          if (options.where.token === user.token) {
            return user;
          }
        }
        return null;
      });
      const result = await usersService.findOneByToken('incorrect token', {
        stripPassword: true,
      });

      expect(result).toBe(null);
    });
  });

  describe('find', () => {
    beforeEach(() => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(async ({ where }) => {
        for (let field in where) {
          if (user[field] !== where[field]) return null;
        }

        return user;
      });
    });

    it('Should return the correct user with one parameter.', async () => {
      const result = await usersService.find({ id: 1 });

      expect(result).toBe(user);
    });

    it('Should return the correct user with two parameters.', async () => {
      const result = await usersService.find({ id: 1, first_name: 'Jack' });

      expect(result).toBe(user);
    });

    it("Should not show the user's password and token.", async () => {
      const result = await usersService.find({ id: 1 });

      expect(result.token).toBe(undefined);
      expect(result.password).toBe(undefined);
    });

    it('Should return null if no user can be found.', async () => {
      const result = await usersService.find({ id: 0 });

      expect(result).toBe(null);
    });
  });
});
