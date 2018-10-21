import { Controller, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { RecipeEntity } from '../entitities/recipe.entity';
import { FindRecipePipe } from '../pipes/find-recipe.pipe';
import { CreateRecipeDTO } from '../dto/create-recipe.dto';
import { RecipeService } from '../services/recipe.service';
import { User } from '../../users/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { UpdateRecipeDTO } from '../dto/update-recipe.dto';
import { OwnsRecipe } from '../guards/owns-recipe.decorator';
import { RequireAuth } from '../../auth/require-auth.decorator';
import { Validate } from '../../security/validate.decorator';

/**
 * A controller to manage CRUD operations of Recipes. Used in the RecipesModule.
 * @property _recipeService - An instance of the RecipeService, injected by Nest.
 * @example controllers: [RecipeController, ...controllers]
 */
@Controller('recipe')
export class RecipeController {
  /**
   * Constructor for the RecipeController.
   * @constructor
   * @param _recipeService An instance of the RecipeService, injected by Nest.
   */
  constructor(private readonly _recipeService: RecipeService) {}

  /**
   * A controller method to handle a POST request to /recipe/create.
   * @async
   * @param user The user who is creating the recipe.
   * @param recipeData The recipe data to store.
   * @returns The newly created recipe.
   */
  @Post('create')
  @RequireAuth()
  @Validate()
  async create(
    @User() user: UserEntity,
    @Body() recipeData: CreateRecipeDTO,
  ): Promise<RecipeEntity> {
    return this._recipeService.create(user, recipeData);
  }

  /**
   * A controller method to handle a PUT request to /recipe/:id.
   * @async
   * @param recipeData The data to update the recipe with.
   * @param recipe The recipe to be updated.
   * @returns The updated recipe.
   */
  @Put(':id')
  @OwnsRecipe()
  @RequireAuth()
  @Validate('SkipMissing')
  async update(
    @Body() recipeData: UpdateRecipeDTO,
    @Param('id', FindRecipePipe)
    recipe: RecipeEntity,
  ): Promise<RecipeEntity> {
    return this._recipeService.update(recipe, recipeData);
  }

  /**
   * A controller method to handle a DELETE request to /recipe/:id.
   * @async
   * @param recipe The recipe to delete.
   */
  @Delete(':id')
  @OwnsRecipe()
  @RequireAuth()
  async delete(
    @Param('id', FindRecipePipe)
    recipe: RecipeEntity,
  ): Promise<void> {
    await this._recipeService.delete(recipe);
  }
}
