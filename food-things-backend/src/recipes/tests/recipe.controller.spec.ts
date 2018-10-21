import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';
import { RecipeService } from '../services/recipe.service';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { PaginationService } from '../../database/services/pagination.service';

describe('RecipeController', () => {
  let module: TestingModule;
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
        RecipeService,
        RecipeFinderService,
        PaginationService,
      ],
    }).compile();
    recipeController = module.get<RecipeController>(RecipeController);
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('Should be defined.', () => {
    expect(recipeController).toBeDefined();
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

  describe('create', () => {
    it('Should return the data that was passed to it.', async () => {
      const result = await recipeController.create({} as any, recipe as any);
      expect(result).toBe(recipe);
    });
  });

  describe('update', () => {
    it('Should return the updated recipe.', async () => {
      jest
        .spyOn(recipeService, 'update')
        .mockImplementation((original, data) => Object.assign(original, data));

      const name = 'better salad';
      const result = await recipeController.update({ name }, recipe);
      expect(result.name).toBe(name);
      expect(result.body).toBe(recipe.body);
    });
  });

  describe('delete', () => {
    it('Should return nothing.', async () => {
      const result = await recipeController.delete(recipe);
      expect(result).toBeUndefined();
    });
  });
});
