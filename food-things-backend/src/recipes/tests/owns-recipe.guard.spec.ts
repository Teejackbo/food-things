import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnsRecipeGuard } from '../guards/owns-recipe.guard';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { PaginationService } from '../../database/services/pagination.service';

describe('OwnsRecipeGuard', () => {
  let guard: OwnsRecipeGuard;
  let recipeRepo;
  let recipeService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnsRecipeGuard,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
        RecipeFinderService,
        PaginationService,
      ],
    }).compile();
    guard = module.get<OwnsRecipeGuard>(OwnsRecipeGuard);
    recipeRepo = module.get(getRepositoryToken(RecipeEntity));
    recipeService = module.get(RecipeFinderService);
  });

  const user = {
    id: 1,
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'me@jackcoldrick.xyz',
    username: 'jack',
    password: 'password',
  };

  // Fake context object to be used in canActivate.
  const context = {
    switchToHttp: () => ({
      getRequest: () => ({
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      }),
    }),
  };

  it('Should be defined.', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('Returns false if the user did not create the recipe.', async () => {
      jest.spyOn(recipeRepo, 'findOne').mockImplementation(async () => ({
        user: {
          ...user,
          id: 2,
        },
      }));

      const result = await guard.canActivate(context as any);
      expect(result).toBe(false);
    });

    it('Returns true if the user did create the recipe.', async () => {
      jest
        .spyOn(recipeRepo, 'findOne')
        .mockImplementation(async () => ({ user }));

      const result = await guard.canActivate(context as any);
      expect(result).toBe(true);
    });
  });
});
