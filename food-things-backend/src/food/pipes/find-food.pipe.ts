import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from '../entities/food.entity';
import { Repository } from 'typeorm';

/**
 * A pipe to find a food item.
 * @property _foodRepository - The repository for interacting with the food table. Injected by Nest.
 * Example:
 * ```js
 * @UsePipes(FindFoodPipe)
 * ```
 */
@Injectable()
export class FindFoodPipe implements PipeTransform {
  /**
   * The constructor for the FindFoodPipe.
   * @constructor
   * @param _foodRepository The repository for interacting with the food table. Injected by Nest.
   */
  constructor(
    @InjectRepository(FoodEntity)
    private readonly _foodRepository: Repository<FoodEntity>,
  ) {}

  /**
   * Finds the food, and throws an error if it can't.
   * @async
   * @throws Throws a NotFoundException to provide the correct response if the food doesn't exist.
   * @param id The ID of the recipe.
   * @param metadata Metadata provided by Nest.
   * @returns The food item that was found.
   */
  async transform(id: number | string, metadata: ArgumentMetadata) {
    const foodItem = await this._foodRepository.findOne(id);
    if (!foodItem) throw new NotFoundException();
    return foodItem;
  }
}
