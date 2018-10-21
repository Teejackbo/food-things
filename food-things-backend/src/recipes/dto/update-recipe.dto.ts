import { IsBoolean, IsNotEmpty, IsArray, IsString } from 'class-validator';
import { FoodEntity } from 'food/entities/food.entity';

/**
 * The DTO for updating a recipe.
 * @property published   - Boolean representing if the recipe has been published or not.
 * @property name        - The name of the recipe.
 * @property description - A description of the recipe.
 * @property body        - The body of the recipe.
 * @property foodItems   - The ingredients of the recipe.
 */
export class UpdateRecipeDTO {
  /**
   * Boolean representing if the recipe has been published or not.
   * @public
   */
  @IsBoolean() published?: boolean;

  /**
   * The name of the recipe.
   * @public
   */
  @IsNotEmpty()
  @IsString()
  name?: string;

  /**
   * A description of the recipe.
   * @public
   */
  @IsNotEmpty()
  @IsString()
  description?: string;

  /**
   * The body of the recipe.
   * @public
   */
  @IsNotEmpty()
  @IsString()
  body?: string;

  /**
   * The ingredients of the recipe.
   * @public
   */
  @IsArray() ingredients?: FoodEntity[];
}
