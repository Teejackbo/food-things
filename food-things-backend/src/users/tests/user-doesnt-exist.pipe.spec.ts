import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDoesntExistPipe } from '../pipes/user-doesnt-exist.pipe';
import { UserEntity } from '../entities/user.entity';
import { MockUserEntity } from './user.mock';

describe('UserDoesntExistPipe', () => {
  let pipe: UserDoesntExistPipe;
  let usersRepo;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDoesntExistPipe,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();
    pipe = module.get<UserDoesntExistPipe>(UserDoesntExistPipe);
    usersRepo = module.get('UserEntityRepository');
  });

  it('Should be defined.', () => {
    expect(pipe).toBeDefined();
  });

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
  };

  describe('transform', () => {
    it('Should throw an error if the username is taken.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(() => user);
      let result;
      try {
        await pipe.transform(user);
      } catch (e) {
        result = e;
      }
      expect(result).toBeTruthy();
    });

    it('Should throw an error if the email is taken.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(options => {
        if (options.where.username) {
          return null;
        }
        return user;
      });
      let result;
      try {
        await pipe.transform({ ...user, username: 'different' });
      } catch (e) {
        result = e;
      }
      expect(result).toBeTruthy();
    });

    it('Should return the user if email and username are available.', async () => {
      jest.spyOn(usersRepo, 'findOne').mockImplementation(() => null);
      const result = await pipe.transform(user);
      expect(result).toBe(user);
    });
  });
});
