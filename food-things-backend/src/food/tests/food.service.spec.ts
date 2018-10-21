import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodService } from '../services/food.service';
import { FoodEntity } from '../entities/food.entity';
import { MockFoodEntity } from './food.mock';
import { CreateFoodDTO } from '../dto/create-food.dto';

describe('FoodService', () => {
  let foodService: FoodService;
  let foodRepo;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: MockFoodEntity,
        },
      ],
    }).compile();
    foodService = module.get<FoodService>(FoodService);
    foodRepo = module.get('FoodEntityRepository');
  });

  it('Should be defined.', () => {
    expect(foodService).toBeDefined();
  });

  const food: CreateFoodDTO = {
    name: 'Carrots',
    description: 'Come on, you know what carrots are.',
    calories: 41,
    carbs: 9.58,
    protein: 0.93,
    fat: 0.24,
  };

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  describe('create', () => {
    it('Should return the food data that was stored.', async () => {
      const result = await foodService.create(user, food);
      expect(result).toBe(food);
    });
  });

  describe('update', () => {
    it('Should return the updated food item.', async () => {
      const { name, description } = food;
      jest
        .spyOn(foodRepo, 'merge')
        .mockImplementation((original, data) => Object.assign(original, data));

      const result = await foodService.update(food as any, {
        name: 'new name',
      });
      expect(result.name).not.toBe(name);
      expect(result.description).toBe(description);
      result.name = name;
    });
  });

  describe('delete', () => {
    it('Should return nothing.', async () => {
      const result = await foodService.delete(food as any);
      expect(result).toBeUndefined();
    });
  });
});
