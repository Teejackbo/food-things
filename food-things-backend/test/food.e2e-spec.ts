import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodModule } from '../src/food/food.module';
import { FoodEntity } from '../src/food/entities/food.entity';
import { MockFoodEntity } from '../src/food/tests/food.mock';
import { FindFoodPipe } from '../src/food/pipes/find-food.pipe';
import { FoodService } from '../src/food/services/food.service';

describe('Food', () => {
  let app: INestApplication;
  const foodService = {
    create(user, data) {
      return data;
    },
    update(foodData, data) {
      return Object.assign(food, data);
    },
    delete(foodData) {},
    findOne(id) {
      if (id === food.id) return food;
      return null;
    },
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [FoodModule],
    })
      .overrideProvider(getRepositoryToken(FoodEntity))
      .useClass(MockFoodEntity)
      .overridePipe(FindFoodPipe)
      .useValue({ transform: () => food })
      .overrideProvider(FoodService)
      .useValue(foodService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const food = {
    id: 1,
    name: 'Carrots',
    slug: 'carrots',
    description: 'Come on, you know what carrots are.',
    calories: 41,
    carbs: 9.58,
    protein: 0.93,
    fat: 0.24,
  };

  describe('FoodController', () => {
    it('/GET /food/:id', () => {
      return request(app.getHttpServer())
        .get('/food/1')
        .expect(200)
        .expect(food);
    });

    it('/POST /food/create', () => {
      return request(app.getHttpServer())
        .post('/food/create')
        .send(food)
        .expect(201)
        .expect(foodService.create({}, food));
    });

    it('/PUT /food/:id', () => {
      const data = { ...food, description: 'Carrots are a vegetable.' };
      return request(app.getHttpServer())
        .put('/food/1')
        .send(data)
        .expect(200)
        .expect(foodService.update(food, data));
    });

    it('/DELETE /food:id', () => {
      return request(app.getHttpServer())
        .delete('/food/1')
        .expect(200);
    });
  });
});
