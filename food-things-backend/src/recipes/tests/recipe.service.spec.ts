import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from '../services/recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
      ],
    }).compile();
    recipeService = module.get<RecipeService>(RecipeService);
    repository = module.get(getRepositoryToken(RecipeEntity));
  });

  let recipe: RecipeEntity = {
    id: 1,
    published: true,
    name: 'Salad',
    description: 'A nice salad.',
    body: 'What a nice salad.',
    user: {} as any,
    foodItems: [{ name: 'tomatoes' } as any, { name: 'lettuce' } as any],
  } as any;

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  it('Should be defined.', () => {
    expect(recipeService).toBeDefined();
  });

  describe('create', () => {
    it('Should return an object with the data that was passed in.', async () => {
      const originalRecipe = recipe;
      const result = await recipeService.create(user as any, recipe as any);
      expect(result).toEqual({ ...recipe, user });
      recipe = originalRecipe;
    });
  });

  describe('update', () => {
    it('Should return the updated recipe.', async () => {
      const name = 'new name';
      const result = await recipeService.update(recipe, { name });
      expect(result.name).toBe(name);
      expect(result.body).toBe(recipe.body);
    });
  });

  describe('delete', () => {
    it('Should return nothing.', async () => {
      const result = await recipeService.delete(recipe);
      expect(result).toBeUndefined();
    });
  });
});
