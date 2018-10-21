import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHashingPipe } from '../pipes/password-hashing.pipe';
import { SecurityService } from '../services/security.service';

describe('PasswordHashingPipe', () => {
  let pipe: PasswordHashingPipe;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityService, PasswordHashingPipe],
    }).compile();
    pipe = module.get<PasswordHashingPipe>(PasswordHashingPipe);
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
    token: 'abc123',
  };

  describe('transform', () => {
    it('If passed a string, should return a string.', async () => {
      const string = 'hash me';
      const result = await pipe.transform(string);
      expect(typeof result).toBe('string');
    });

    it('If passed a string, should return a hashed version of that string.', async () => {
      const string = 'hash me';
      const result = await pipe.transform(string);
      expect(result).not.toBe(string);
    });

    it('Should return a string of length 60 if passed a string.', async () => {
      const string = 'hash me';
      const result = await pipe.transform(string);
      expect(result).toHaveLength(60);
    });

    it('Should return an object if passed an object.', async () => {
      const originalPassword = user.password;
      const result = await pipe.transform(user);
      expect(typeof result).toBe('object');
      user.password = originalPassword;
    });

    it('Should return the original object if no password value is present.', async () => {
      const object = {
        a: 1,
        b: 'test',
      };
      const result = await pipe.transform(object);
      expect(result).toBe(object);
    });

    it('Should return the original object but with a hashed password value.', async () => {
      const originalPassword = user.password;
      const result = await pipe.transform(user);
      expect(result.password).not.toBe(originalPassword);
      expect(result.password).not.toMatch(new RegExp(originalPassword));
      user.password = originalPassword;
    });

    it('Should return the original value if passed a value that is not an object or string.', async () => {
      expect(await pipe.transform(undefined)).toBe(undefined);
      expect(await pipe.transform(null)).toBe(null);
      expect(await pipe.transform(50)).toBe(50);
      expect(await pipe.transform([1, 2])).toEqual([1, 2]);
    });
  });
});
