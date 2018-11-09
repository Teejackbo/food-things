import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { FoodService } from '../services/food.service';
import { FoodEntity } from '../entities/food.entity';
import { CreateFoodDTO } from '../dto/create-food.dto';
import { UpdateFoodDTO } from '../dto/update-food.dto';
import { FindFoodPipe } from '../pipes/find-food.pipe';
import { User } from '../../users/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { RequireAuth } from '../../auth/require-auth.decorator';
import { Validate } from '../../security/validate.decorator';

/**
 * A controller to manage CRUD operations of food. Used in the FoodModule.
 * @example controllers: [FoodController, ...controllers]
 * @property _foodService - An instance of the FoodService. Injected by Nest.
 */
@Controller('food')
export class FoodController {
  /**
   * Constructor for the FoodController.
   * @constructor
   * @param _foodService An instance of the FoodService. Injected by Nest.
   */
  constructor(private readonly _foodService: FoodService) {}

  /**
   * A controller method to handle a POST request to /food/create.
   * @async
   * @param foodData The food data to store.
   * @returns The data that was stored.
   */
  @Post('create')
  @RequireAuth()
  @Validate()
  async create(
    @User() user: UserEntity,
    @Body() foodData: CreateFoodDTO,
  ): Promise<FoodEntity> {
    return this._foodService.create(user, foodData);
  }

  /**
   * A controller method to handle a PUT request to /food/:id.
   * @async
   * @param food The food item to update.
   * @param foodData The data to update the food item with.
   * @returns The updated food item.
   */
  @Put(':id')
  @RequireAuth()
  @Validate('SkipMissing')
  async update(
    @Param('id', FindFoodPipe)
    food: FoodEntity,
    @Body() foodData: UpdateFoodDTO,
  ): Promise<FoodEntity> {
    return this._foodService.update(food, foodData);
  }

  /**
   * A controller method to handle a GET request to /food/:id.
   * @async
   * @param food The food item to retrieve.
   * @returns The requested food item.
   */
  @Get(':id')
  async find(
    @Param('id', FindFoodPipe)
    food: FoodEntity,
  ): Promise<FoodEntity> {
    return food;
  }

  /**
   * A controller method to handle a DELETE request to /food/:id.
   * @async
   * @param food The food item to delete.
   */
  @Delete(':id')
  @RequireAuth()
  async delete(
    @Param('id', FindFoodPipe)
    food: FoodEntity,
  ): Promise<void> {
    await this._foodService.delete(food);
  }
}
