import { Test, TestingModule } from '@nestjs/testing';
import { UserFoodController } from '../controllers/user-food.controller';

describe('UserFoodController', () => {
  let module: TestingModule;
  let controller: UserFoodController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserFoodController],
    }).compile();

    controller = module.get<UserFoodController>(UserFoodController);
  });

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });
});
