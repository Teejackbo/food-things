import { IsNotEmpty, IsNumber, Min } from 'class-validator';

/**
 * The data-transfer object for creating a new food.
 * @property name        - The name of the food.
 * @property description - A description of the food.
 * @property calories    - The number of calories per 100g.
 * @property carbs       - The weight of carbs per 100g.
 * @property protein     - The weight of protein per 100g.
 * @property fat         - The weight of fat per 100g.
 */
export class CreateFoodDTO {
  /**
   * The name of the food.
   * @public
   * @readonly
   */
  @IsNotEmpty({ message: 'Please enter the name of the food.' })
  readonly name: string;

  /**
   * A description of the food.
   * @public
   * @readonly
   */
  @IsNotEmpty({ message: 'Please enter a description of the food.' })
  readonly description: string;

  /**
   * The number of calories per 100g.
   * @public
   * @readonly
   */
  @IsNumber({}, { message: 'The number of calories must be a number.' })
  @Min(0, { message: 'Calories must be above 0.' })
  readonly calories: number;

  /**
   * The weight of carbs per 100g.
   * @public
   * @readonly
   */
  @IsNumber({}, { message: 'The amount of carbs must be a number.' })
  @Min(0, { message: 'Carbs must be above 0.' })
  readonly carbs: number;

  /**
   * The weight of protein per 100g.
   * @public
   * @readonly
   */
  @IsNumber({}, { message: 'The amount of protein must be a number.' })
  @Min(0, { message: 'Protein must be above 0.' })
  readonly protein: number;

  /**
   * The weight of fat per 100g.
   * @public
   * @readonly
   */
  @IsNumber({}, { message: 'The amount of fat must be a number.' })
  @Min(0, { message: 'Fat must be above 0.' })
  readonly fat: number;
}
