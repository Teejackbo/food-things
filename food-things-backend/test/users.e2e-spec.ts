import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from '../src/users/users.module';
import { UserEntity } from '../src/users/entities/user.entity';
import { MockUserEntity } from '../src/users/tests/user.mock';
import { UserRegistrationService } from '../src/users/services/user-registration.service';
import { UserDoesntExistPipe } from '../src/users/pipes/user-doesnt-exist.pipe';
import { UserAuthenticationService } from '../src/users/services/user-authentication.service';
import { UsersService } from '../src/users/services/users.service';

describe('Users', () => {
  let app: INestApplication;
  const userRegService = {
    register: data => ({
      ...data,
      password: '$2b$10$fye8jIfxWIvWX5zuwxKfXeikEWzgFUBKE./GhtxZu22tpConCu14q',
      token: '6dcedbe5c8fac9b848e7',
      id: 1,
      createdAt: '2018-06-25T20:04:22.652Z',
      updatedAt: '2018-06-25T20:04:22.652Z',
    }),
  };

  const userAuthService = {
    login: data => user,
    logout() {},
  };

  const usersService = {
    find({ where }) {
      for (let field in where) {
        if (user[field] !== where[field]) return null;
      }

      return user;
    },
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(MockUserEntity)
      .overrideProvider(UserRegistrationService)
      .useValue(userRegService)
      .overridePipe(UserDoesntExistPipe)
      .useValue({ transform: data => data })
      .overrideProvider(UserAuthenticationService)
      .useValue(userAuthService)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'me@jackcoldrick.xyz',
    username: 'jack',
    password: 'password',
  };

  describe('UserRegistration', () => {
    it('/POST /users/register', () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send(user)
        .expect(201)
        .expect(userRegService.register(user));
    });
  });

  describe('UserAuthentication', () => {
    it('/GET /users/logout', () => {
      return request(app.getHttpServer())
        .get('/users/logout')
        .expect(200);
    });

    it('/POST /users/login', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ username: user.username, password: user.password })
        .expect(200)
        .expect(userAuthService.login(user));
    });
  });

  describe('UserFinder', () => {
    beforeEach(() => {});

    it('/GET /users/find?id=1', () => {
      return request(app.getHttpServer())
        .get('/users/find?id=1')
        .expect(200)
        .expect(user);
    });
  });
});
