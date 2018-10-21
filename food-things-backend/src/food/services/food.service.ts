import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entities/food.entity';
import { CreateFoodDTO } from '../dto/create-food.dto';
import { UpdateFoodDTO } from '../dto/update-food.dto';
import { UserEntity } from 'users/entities/user.entity';

/**
 * A service to handle the CRUD functionality of food.
 * @property _foodRepository The repository for interacting with the food table. Injected by Nest.
 */
@Injectable()
export class FoodService {
  /**
   * The constructor for the FoodService.
   * @constructor
   * @param _foodRepository The repository for interacting with the food table. Injected by Nest.
   */
  constructor(
    @InjectRepository(FoodEntity)
    private readonly _foodRepository: Repository<FoodEntity>,
  ) {}

  /**
   * Stores a new food item in the database.
   * @async
   * @example await this._foodService.create(data);
   * @param user The user who created the food item.
   * @param foodData The food data to store.
   * @returns The record that was saved.
   */
  async create(user: UserEntity, foodData: CreateFoodDTO): Promise<FoodEntity> {
    const foodItem: FoodEntity = this._foodRepository.create(foodData);
    foodItem.user = user;
    return this._foodRepository.save(foodItem);
  }

  /**
   * Updates a food item.
   * @async
   * @param slug The food item to update.
   * @param foodData The data to update the food item with.
   * @returns The updated food item.
   */
  async update(food: FoodEntity, foodData: UpdateFoodDTO): Promise<FoodEntity> {
    await this._foodRepository.merge(food, foodData);
    return this._foodRepository.save(food);
  }

  /**
   * Deletes a food item.
   * @async
   * @param food The food item to delete.
   */
  async delete(food: FoodEntity): Promise<void> {
    await this._foodRepository.delete(food.id);
  }
}
