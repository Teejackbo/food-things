import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { RecipeEntity } from '../entitities/recipe.entity';
import { MockRecipeEntity } from './recipe.mock';
import { PaginationService } from '../../database/services/pagination.service';

describe('RecipeFinderService', () => {
  let finderService: RecipeFinderService;
  let repository;
  let paginationService: PaginationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeFinderService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: MockRecipeEntity,
        },
        PaginationService,
      ],
    }).compile();
    finderService = module.get<RecipeFinderService>(RecipeFinderService);
    repository = module.get(getRepositoryToken(RecipeEntity));
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('Should be defined.', () => {
    expect(finderService).toBeDefined();
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

  const user = {
    first_name: 'Jack',
    last_name: 'Coldrick',
    email: 'jcldrk@gmail.com',
    username: 'jack',
    password: 'password',
    token: 'abc123',
  };

  describe('findUser', () => {
    it('Should throw an exception if the recipe cant be found.', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);
      let result;
      try {
        await finderService.findUser(1);
      } catch (e) {
        result = e;
      }
      expect(result).toBeDefined();
      expect(result.status).toBe(404);
    });

    it('Should return the user attached to the recipe.', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => ({ ...recipe, user: { ...user } }));

      const result = await finderService.findUser(1);
      expect(result).toEqual(user);
    });
  });

  describe('findById', () => {
    it('Should throw an error if the recipe cant be found.', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);
      let result;
      try {
        await finderService.findById(1);
      } catch (e) {
        result = e;
      }
      expect(result).toBeDefined();
      expect(result.status).toBe(404);
    });

    it('Should return the recipe that is found.', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => recipe);
      const result = await finderService.findById(1);
      expect(result).toBe(recipe);
    });
  });

  describe('paginate', () => {
    it('Should return an object.', async () => {
      jest.spyOn(paginationService, 'paginate').mockImplementation(() => ({}));
      const result = await finderService.paginate(1, 5);
      expect(typeof result).toBe('object');
    });

    it('Should return a pagination object.', async () => {
      jest.spyOn(paginationService, 'paginate').mockImplementation(() => ({
        data: [recipe, recipe, recipe, recipe, recipe],
        page: 2,
        next: 3,
        previous: 1,
      }));
      const result = await finderService.paginate(1, 5);
      expect(result.data).toHaveLength(5);
      expect(result.page).toBeDefined();
      expect(result.next).toBeDefined();
      expect(result.previous).toBeDefined();
    });
  });
});
