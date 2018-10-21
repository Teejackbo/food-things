import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecipeFinderController } from '../controllers/recipe-finder.controller';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';
import { PaginationService } from '../../database/services/pagination.service';

describe('RecipeFinderController', () => {
  let module: TestingModule;
  let controller: RecipeFinderController;
  let service: PaginationService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RecipeFinderController],
      providers: [
        RecipeFinderService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
        PaginationService,
      ],
    }).compile();

    controller = module.get<RecipeFinderController>(RecipeFinderController);
    service = module.get<PaginationService>(PaginationService);
  });

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });

  const recipe: RecipeEntity = {
    id: 1,
    published: true,
    name: 'Salad',
    description: 'A nice salad.',
    body: 'What a nice salad.',
    user: {} as any,
    foodItems: [{ name: 'tomatoes' } as any, { name: 'lettuce' } as any],
  } as any;

  describe('find', () => {
    it('Should return the recipe that was passed to it.', async () => {
      const result = await controller.find(recipe);
      expect(result).toBe(recipe);
    });
  });

  describe('paginate', () => {
    it('Should return a pagination object.', async () => {
      jest.spyOn(service, 'paginate').mockImplementation(() => ({
        data: [recipe, recipe, recipe, recipe, recipe],
        page: 2,
        next: 3,
        previous: 1,
      }));
      const result = await controller.paginate(2, 5);
      expect(result.data).toHaveLength(5);
      expect(result.page).toBeDefined();
      expect(result.next).toBeDefined();
      expect(result.previous).toBeDefined();
    });
  });
});
