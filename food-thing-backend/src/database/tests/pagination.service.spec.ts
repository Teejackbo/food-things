import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from '../services/pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();
    service = module.get<PaginationService>(PaginationService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('Returns an object.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation(() => ['recipe']);
      const result = await service.paginate(1, 5, {} as any);
      expect(typeof result).toBe('object');
    });

    it('Returns an object with the correct properties and types.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation(() => [['a', 'b', 'c', 'd', 'e'], 10]);

      const result = await service.paginate(1, 5, {} as any);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(5);
      expect(typeof result.data).toBe('object');

      expect(result.next).toBeDefined();
      expect(typeof result.next).toBe('number');

      expect(result.page).toBeDefined();
      expect(typeof result.page).toBe('number');

      expect(result.previous).toBeDefined();
      expect(typeof result.previous).toBe('number');
    });

    it('Throws an error if no data is found.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation(() => [[], 0]);
      let result;
      try {
        await service.paginate(1, 5, {} as any);
      } catch (e) {
        result = e;
      }
      expect(result).toBeDefined();
      expect(result.status).toBe(404);
    });

    it('Returns the correct number of records, and the correct page information.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation((repo, num, amount) => {
          const arr = [];
          for (let i = 0; i < amount; i++) {
            arr.push('result');
          }
          return [arr, num + 2 * amount];
        });
      const result = await service.paginate(2, 5, {} as any);
      expect(result.data).toHaveLength(5);
      expect(result.page).toBe(2);
      expect(result.next).toBe(3);
      expect(result.previous).toBe(1);
    });

    it('Returns the correct page information if the page is the first page, and there are more records to be found.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation((repo, num, amount) => {
          const arr = [];
          for (let i = 0; i < amount; i++) {
            arr.push('result');
          }
          return [arr, num + 2 * amount];
        });
      const result = await service.paginate(1, 5, {} as any);
      expect(result.page).toBe(1);
      expect(result.next).toBe(2);
      expect(result.previous).toBe(1);
    });

    it('Returns the correct page information if the page is the first page, and there are no more records to be found.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation((repo, num, amount) => [['a'], 2]);
      const result = await service.paginate(1, 5, {} as any);
      expect(result.page).toBe(1);
      expect(result.next).toBe(1);
      expect(result.previous).toBe(1);
    });

    it('Returns the correct page information if there are more records to be found.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation((repo, num, amount) => [
          ['a', 'b', 'c', 'd', 'e'],
          num + 2 * amount,
        ]);
      const result = await service.paginate(3, 5, {} as any);
      expect(result.page).toBe(3);
      expect(result.next).toBe(4);
      expect(result.previous).toBe(2);
    });

    it('Returns the correct page information if there are no more records to be found.', async () => {
      jest
        .spyOn(service as any, '_fetchData')
        .mockImplementation((repo, num, amount) => [['a'], 2]);
      const result = await service.paginate(3, 5, {} as any);
      expect(result.page).toBe(3);
      expect(result.next).toBe(3);
      expect(result.previous).toBe(2);
    });
  });
});
