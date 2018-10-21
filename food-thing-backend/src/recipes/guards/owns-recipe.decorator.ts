import { UseGuards } from '@nestjs/common';
import { OwnsRecipeGuard } from './owns-recipe.guard';

/**
 * A decorator to provide a guard to make sure the user created the recipe they are trying to edit.
 */
export const OwnsRecipe = () => UseGuards(OwnsRecipeGuard);
