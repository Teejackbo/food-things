import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entitities/recipe.entity';
import { RecipeController } from './controllers/recipe.controller';
import { FindRecipePipe } from './pipes/find-recipe.pipe';
import { RecipeService } from './services/recipe.service';
import { OwnsRecipeGuard } from './guards/owns-recipe.guard';
import { RecipeFinderController } from './controllers/recipe-finder.controller';
import { RecipeFinderService } from './services/recipe-finder.service';
import { DatabaseModule } from '../database/database.module';

/**
 * The RecipesModule. Handles everything to do with recipes.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity]), DatabaseModule],
  controllers: [RecipeController, RecipeFinderController],
  providers: [
    RecipeService,
    RecipeFinderService,
    FindRecipePipe,
    OwnsRecipeGuard,
  ],
})
export class RecipesModule {}
