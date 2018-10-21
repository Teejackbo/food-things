import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RecipeFinderService } from '../services/recipe-finder.service';

/**
 * A guard to check whether or not a user created a recipe.
 * @property _recipeService - An instance of the RecipeService, injected by Nest.
 */
@Injectable()
export class OwnsRecipeGuard implements CanActivate {
  /**
   * The constructor for the OwnsRecipeGuard.
   * @constructor
   * @param _recipeFinderService An instance of the RecipeFinderService, injected by Nest.
   */
  constructor(private readonly _recipeFinderService: RecipeFinderService) {}

  /**
   * Determines if the user is the one who created the recipe.
   * @async
   * @param context ExecutionContext provided by Nest.
   * @returns Boolean indicating if the user is allowed access.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = await this._recipeFinderService.findUser(request.params.id);
    return user.id === request.user.id;
  }
}
