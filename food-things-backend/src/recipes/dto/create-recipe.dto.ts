import { IsBoolean, IsNotEmpty, IsArray } from 'class-validator';
import { FoodEntity } from 'food/entities/food.entity';

/**
 * The DTO for creating a new recipe.
 * @property published   - Boolean representing if the recipe has been published or not.
 * @property name        - The name of the recipe.
 * @property description - A description of the recipe.
 * @property body        - The body of the recipe.
 * @property foodItems   - The ingredients of the recipe.
 */
export class CreateRecipeDTO {
  /**
   * Boolean representing if the recipe has been published or not.
   * @public
   */
  @IsBoolean() published: boolean;

  /**
   * The name of the recipe.
   * @public
   */
  @IsNotEmpty() name: string;

  /**
   * A description of the recipe.
   * @public
   */
  @IsNotEmpty() description: string;

  /**
   * The body of the recipe.
   * @public
   */
  @IsNotEmpty() body: string;

  /**
   * The ingredients of the recipe.
   * @public
   */
  @IsArray() ingredients: FoodEntity[];
}
