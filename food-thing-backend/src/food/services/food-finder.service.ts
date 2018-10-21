import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entities/food.entity';

/**
 * A service to find food.
 * @property _foodRepository - The repository for interacting with the food table. Injected by Nest.
 */
@Injectable()
export class FoodFinderService {
  /**
   * The constructor for the FoodFinderService.
   * @constructor
   * @param _foodRepository The repository for interacting with the food table. Injected by Nest.
   */
  constructor(
    @InjectRepository(FoodEntity)
    private readonly _foodRepository: Repository<FoodEntity>,
  ) {}
}
