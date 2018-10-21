import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RecipesModule } from '../src/recipes/recipes.module';
import { MockRecipeEntity } from '../src/recipes/tests/recipe.mock';
import { FindRecipePipe } from '../src/recipes/pipes/find-recipe.pipe';
import { RecipeEntity } from '../src/recipes/entitities/recipe.entity';
import { RecipeService } from '../src/recipes/services/recipe.service';
import { OwnsRecipeGuard } from '../src/recipes/guards/owns-recipe.guard';
import { PaginationService } from '../src/database/services/pagination.service';

describe('Recipes', () => {
  let app: INestApplication;

  const recipeArray = number => {
    const arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(recipe);
    }
    return arr;
  };

  const recipe: RecipeEntity = {
    id: 1,
    published: true,
    name: 'Salad',
    description: 'A nice salad.',
    body: 'What a nice salad.',
    user: {} as any,
    foodItems: [{ name: 'tomatoes' } as any, { name: 'lettuce' } as any],
  } as any;

  const recipeData = {
    published: true,
    name: 'Salad',
    description: 'A nice salad.',
    body: 'What a nice salad.',
    ingredients: [{ name: 'tomatoes' } as any, { name: 'lettuce' } as any],
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [RecipesModule],
    })
      .overrideProvider(getRepositoryToken(RecipeEntity))
      .useClass(MockRecipeEntity)
      .overridePipe(FindRecipePipe)
      .useValue({ transform: () => recipe })
      .overrideProvider(RecipeService)
      .useValue({
        findOne: () => recipe,
        create: data => recipe,
        update: (recipeToUpdate, data) => Object.assign(recipeToUpdate, data),
        delete: recipeToDelete => {},
      })
      .overrideGuard(OwnsRecipeGuard)
      .useValue(() => true)
      .overrideProvider(PaginationService)
      .useValue({
        paginate: (page, amount, repo) => {
          return {
            data: recipeArray(amount),
            page,
            next: page + 1,
            previous: page === 1 ? 1 : page - 1,
          };
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('RecipeFinderController', () => {
    it('/GET /recipe/:id', () => {
      return request(app.getHttpServer())
        .get('/recipe/1')
        .expect(200)
        .expect(recipe);
    });

    it('/GET /recipe/paginate?page=1&amount=5', () => {
      return request(app.getHttpServer())
        .get('/recipe/paginate?page=1&amount=5')
        .expect(200)
        .expect({
          data: recipeArray(5),
          page: 1,
          next: 2,
          previous: 1,
        });
    });

    it('/GET /recipe/paginate?page=1&amount=10', () => {
      return request(app.getHttpServer())
        .get('/recipe/paginate?page=1&amount=10')
        .expect(200)
        .expect({
          data: recipeArray(10),
          page: 1,
          next: 2,
          previous: 1,
        });
    });

    it('/GET /recipe/paginate?page=2&amount=5', () => {
      return request(app.getHttpServer())
        .get('/recipe/paginate?page=2&amount=5')
        .expect(200)
        .expect({
          data: recipeArray(5),
          page: 2,
          next: 3,
          previous: 1,
        });
    });

    it('/GET /recipe/paginate?page=2&amount=10', () => {
      return request(app.getHttpServer())
        .get('/recipe/paginate?page=2&amount=10')
        .expect(200)
        .expect({
          data: recipeArray(10),
          page: 2,
          next: 3,
          previous: 1,
        });
    });
  });

  describe('RecipeController', () => {
    it('/POST /recipe/create', () => {
      return request(app.getHttpServer())
        .post('/recipe/create')
        .send(recipeData)
        .expect(201)
        .expect(recipe);
    });

    it('/PUT /recipe/:id', () => {
      return request(app.getHttpServer())
        .put('/recipe/1')
        .send({ name: 'new name' })
        .expect(200)
        .expect(Object.assign(recipe, { name: 'new name' }));
    });

    it('/DELETE /recipe/:id', () => {
      return request(app.getHttpServer())
        .delete('/recipe/1')
        .expect(200)
        .expect('');
    });
  });
});
