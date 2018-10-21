import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindRecipePipe } from '../pipes/find-recipe.pipe';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { PaginationService } from '../../database/services/pagination.service';

describe('FindRecipePipe', () => {
  let pipe: FindRecipePipe;
  let recipeRepo;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindRecipePipe,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
        RecipeFinderService,
        PaginationService,
      ],
    }).compile();
    pipe = module.get<FindRecipePipe>(FindRecipePipe);
    recipeRepo = module.get(getRepositoryToken(RecipeEntity));
  });

  it('Should be defined.', () => {
    expect(pipe).toBeDefined();
  });

  const recipe: RecipeEntity = {
    id: 1,
    published: true,
    name: 'Salad',
    description: 'A nice salad.',
    body: 'What a nice salad.',
    user: {} as any,
    ingredients: [{ name: 'tomatoes' } as any, { name: 'lettuce' } as any],
  } as any;

  describe('transform', () => {
    it('Returns a recipe if it exists.', async () => {
      jest.spyOn(recipeRepo, 'findOne').mockImplementation(id => {
        if (id === recipe.id) {
          return recipe;
        }
        return null;
      });
      const result = await pipe.transform(1, {} as any);
      expect(result).toBe(recipe);
    });

    it('Throws a NotFoundException if the recipe cant be found.', async () => {
      jest.spyOn(recipeRepo, 'findOne').mockImplementation(() => null);
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
