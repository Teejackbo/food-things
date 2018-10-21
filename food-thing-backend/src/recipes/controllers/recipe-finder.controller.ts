import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { RecipeFinderService } from '../services/recipe-finder.service';
import { FindRecipePipe } from '../pipes/find-recipe.pipe';
import { RecipeEntity } from '../entitities/recipe.entity';
import { RecipePagination } from '../entitities/recipe.pagination';

/**
 * A controller to manage retrieving recipes.
 * @property _recipeFinderService - An instance of the RecipeFinderService. Injected by Nest.
 */
@Controller('recipe')
export class RecipeFinderController {
  /**
   * The constructor for the RecipeFinderController.
   * @constructor
   * @param _recipeFinderService An instance of the RecipeFinderService. Injected by Nest.
   */
  constructor(private readonly _recipeFinderService: RecipeFinderService) {}

  /**
   * A controller method to handle a GET request to /paginate.
   * @async
   * @param page A query parameter to determine the page of recipes to fetch.
   * @param amount A query parameter to determine the number of recipes to fetch per page.
   * @returns The recipes and metadata to do with the page numbers.
   */
  @Get('paginate')
  async paginate(
    @Query('page', ParseIntPipe)
    page: number = 1,
    @Query('amount', ParseIntPipe)
    amount: number = 10,
  ): Promise<RecipePagination> {
    return this._recipeFinderService.paginate(page, amount);
  }

  /**
   * A controller method to handle a GET request to /recipe/:id.
   * @async
   * @param recipe The recipe that was requested.
   * @returns The recipe that was requested.
   */
  @Get(':id')
  async find(
    @Param('id', FindRecipePipe)
    recipe: RecipeEntity,
  ): Promise<RecipeEntity> {
    return recipe;
  }
}
