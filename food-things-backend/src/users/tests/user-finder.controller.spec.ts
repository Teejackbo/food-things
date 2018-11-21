import { Test, TestingModule } from '@nestjs/testing';
import { UserFinderController } from '../controllers/user-finder.controller';
import { UserEntity } from '../entities/user.entity';
import { MockUserEntity } from './user.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';

describe('UserFinderController', () => {
  let module: TestingModule;
  let controller: UserFinderController;
  let service: UsersService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserFinderController],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<UserFinderController>(UserFinderController);
    service = module.get<UsersService>(UsersService);
  });

  const user = {
    id: 1,
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
  };

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('Should return the user that is found.', async () => {
      jest.spyOn(service, 'find').mockImplementation(async () => user);
      const result = await controller.find({ id: 1 });

      expect(result).toBe(user);
    });

    it('Should throw a NotFoundException if no user was found.', async () => {
      jest.spyOn(service, 'find').mockImplementation(async () => null);
      let result;
      try {
        await controller.find({ id: 2 });
      } catch (e) {
        result = e;
      }

      expect(result).toBeTruthy();
      expect(result.status).toBe(404);
    });
  });
});
