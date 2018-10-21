import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRegistrationController } from '../controllers/user-registration.controller';
import { UserEntity } from '../entities/user.entity';
import { SecurityService } from '../../security/services/security.service';
import { UserRegistrationService } from '../services/user-registration.service';
import { MockUserEntity } from './user.mock';
import { UserDoesntExistPipe } from '../pipes/user-doesnt-exist.pipe';

describe('UserRegistrationController', () => {
  let module: TestingModule;
  let userRegistrationController: UserRegistrationController;
  let userRegistrationService: UserRegistrationService;
  let usersRepo;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserRegistrationController],
      providers: [
        SecurityService,
        UserRegistrationService,
        UserDoesntExistPipe,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserEntity,
        },
      ],
    }).compile();
    userRegistrationController = module.get<UserRegistrationController>(
      UserRegistrationController,
    );
    userRegistrationService = module.get<UserRegistrationService>(
      UserRegistrationService,
    );
    usersRepo = module.get('UserEntityRepository');
  });

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
  };

  it('Should be defined', () => {
    expect(userRegistrationController).toBeDefined();
  });

  describe('register', () => {
    it('Should return the data that was passed to it.', async () => {
      const result = await userRegistrationController.register(user);
      expect(result).toBe(user);
    });
  });
});
