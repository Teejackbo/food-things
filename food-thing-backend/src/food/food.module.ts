import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './entities/food.entity';
import { FoodService } from './services/food.service';
import { FoodController } from './controllers/food.controller';
import { FindFoodPipe } from './pipes/find-food.pipe';
import { FoodFinderService } from './services/food-finder.service';
import { UserFoodController } from './controllers/user-food.controller';

/**
 * The FoodModule. Handles everything to do with food.
 */
@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  providers: [FoodService, FindFoodPipe, FoodFinderService],
  controllers: [FoodController, UserFoodController],
})
export class FoodModule {}
