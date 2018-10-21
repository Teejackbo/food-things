import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodController } from '../controllers/food.controller';
import { FoodService } from '../services/food.service';
import { FoodEntity } from '../entities/food.entity';
import { MockFoodEntity } from './food.mock';
import { CreateFoodDTO } from '../dto/create-food.dto';

describe('FoodController', () => {
  let module: TestingModule;
  let foodController: FoodController;
  let foodRepo;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: MockFoodEntity,
        },
      ],
    }).compile();
    foodController = module.get<FoodController>(FoodController);
    foodRepo = module.get('FoodEntityRepository');
  });
  it('Should be defined.', () => {
    expect(foodController).toBeDefined();
  });

  const food: CreateFoodDTO = {
    name: 'Carrots',
    description: 'Come on, you know what carrots are.',
    calories: 41,
    carbs: 9.58,
    protein: 0.93,
    fat: 0.24,
  };

  describe('create', () => {
    it('Should return the data that was passed to it.', async () => {
      const result = await foodController.create({} as any, food);
      expect(result).toBe(food);
    });
  });

  describe('find', () => {
    it('Should return the food that was passed to it.', async () => {
      const result = await foodController.find(food as any);
      expect(result).toBe(food);
    });
  });

  describe('update', () => {
    it('Should return the updated food item.', async () => {
      const { name, description } = food;
      jest
        .spyOn(foodRepo, 'merge')
        .mockImplementation((original, data) => Object.assign(original, data));

      const result = await foodController.update(food as any, {
        name: 'new name',
      });
      expect(result.name).not.toBe(name);
      expect(result.description).toBe(description);
      result.name = name;
    });
  });

  describe('delete', () => {
    it('Should return nothing.', async () => {
      const result = await foodController.delete(food as any);
      expect(result).toBeUndefined();
    });
  });
});
