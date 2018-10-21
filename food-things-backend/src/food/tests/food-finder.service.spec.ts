import { Test, TestingModule } from '@nestjs/testing';
import { FoodFinderService } from '../services/food-finder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodEntity } from '../entities/food.entity';
import { MockFoodEntity } from './food.mock';

describe('FoodFinderService', () => {
  let service: FoodFinderService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodFinderService,
        {
          provide: getRepositoryToken(FoodEntity),
          useClass: MockFoodEntity,
        },
      ],
    }).compile();

    service = module.get<FoodFinderService>(FoodFinderService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });
});
