import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from '../services/security.service';

describe('SecurityService', () => {
  let securityService: SecurityService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityService],
    }).compile();
    securityService = module.get<SecurityService>(SecurityService);
  });

  it('Should be defined.', () => {
    expect(securityService).toBeDefined();
  });

  describe('generateString', () => {
    it('Should return a string.', async () => {
      const result = await securityService.generateString();
      expect(typeof result).toBe('string');
    });

    it('Should return a string of default length 10.', async () => {
      const result = await securityService.generateString();
      expect(result).toHaveLength(10);
    });

    it('Should return a string of the correct length.', async () => {
      const result = await securityService.generateString(20);
      expect(result).toHaveLength(20);
    });
  });

  describe('hash', () => {
    it('Should return a string.', async () => {
      const value = 'password';
      const result = await securityService.hash(value);
      expect(typeof result).toBe('string');
    });

    it('Should hash a value.', async () => {
      const value = 'password';
      const result = await securityService.hash(value);
      expect(result).not.toBe(value);
    });

    it('Should return a string of length 60.', async () => {
      const value = 'password';
      const result = await securityService.hash(value);
      expect(result).toHaveLength(60);
    });

    it('Should not return a string containing the original value.', async () => {
      const value = 'password';
      const result = await securityService.hash(value);
      expect(result).not.toMatch(new RegExp(value));
    });
  });

  describe('compare', async () => {
    it('Should return a boolean.', async () => {
      const value = 'password';
      const hash = await securityService.hash(value);
      const result = await securityService.compare(value, hash);
      expect(typeof result).toBe('boolean');
    });

    it('Should return false if an incorrect string is provided.', async () => {
      const hash = await securityService.hash('password');
      const result = await securityService.compare('wrong', hash);
      expect(result).toBe(false);
    });

    it('Should return true if the correct string is provided.', async () => {
      const value = 'password';
      const hash = await securityService.hash(value);
      const result = await securityService.compare(value, hash);
      expect(result).toBe(true);
    });
  });
});
