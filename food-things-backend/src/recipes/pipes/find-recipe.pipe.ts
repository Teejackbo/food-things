import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecipeFinderService } from '../services/recipe-finder.service';

/**
 * A pipe to find a recipe from an ID.
 * @property _recipeFinderService - The repository for interacting with the recipes table. Injected by Nest.
 * Example:
 * ```js
 * @Param('id', FindRecipePipe)
 * ```
 */
@Injectable()
export class FindRecipePipe implements PipeTransform {
  /**
   * The constructor for the FindRecipePipe.
   * @constructor
   * @param _recipeFinderService The repository for interacting with the recipes table. Injected by Nest.
   */
  constructor(private readonly _recipeFinderService: RecipeFinderService) {}

  /**
   * Finds the recipe, and throws an error if it can't.
   * @async
   * @throws Throws a NotFoundException to provide the correct response if the food doesn't exist.
   * @param id The ID of the recipe.
   * @param metadata Metadata provided by Nest.
   * @returns The recipe that was found.
   */
  async transform(id: number | string, metadata: ArgumentMetadata) {
    const recipe = await this._recipeFinderService.findById(id);
    if (!recipe) throw new NotFoundException();
    return recipe;
  }
}
