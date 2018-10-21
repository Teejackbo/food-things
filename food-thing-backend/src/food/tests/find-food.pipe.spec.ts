import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindFoodPipe } from '../pipes/find-food.pipe';
import { FoodEntity } from '../entities/food.entity';
import { MockFoodEntity } from './food.mock';

describe('FindFoodPipe', () => {
  let pipe: FindFoodPipe;
  let foodRepo;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindFoodPipe,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: MockFoodEntity,
        },
      ],
    }).compile();
    pipe = module.get<FindFoodPipe>(FindFoodPipe);
    foodRepo = module.get('FoodEntityRepository');
  });

  it('Should be defined.', () => {
    expect(pipe).toBeDefined();
  });

  const food = {
    id: 1,
    name: 'Carrots',
    slug: 'carrots',
    description: 'Come on, you know what carrots are.',
    calories: 41,
    carbs: 9.58,
    protein: 0.93,
    fat: 0.24,
  };

  describe('transform', () => {
    it('Returns a food if it exists.', async () => {
      jest.spyOn(foodRepo, 'findOne').mockImplementation(id => {
        if (id === food.id) {
          return food;
        }
        return null;
      });
      const result = await pipe.transform(1, {} as any);
      expect(result).toBe(food);
    });

    it('Throws a NotFoundException if the food cant be found.', async () => {
      jest.spyOn(foodRepo, 'findOne').mockImplementation(() => null);
      let result;
      try {
        await pipe.transform(1, {} as any);
      } catch (e) {
        result = e;
      }
      expect(result.status).toBe(404);
    });
  });
});
