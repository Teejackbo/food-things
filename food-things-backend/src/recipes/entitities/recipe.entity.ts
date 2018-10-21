import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { FoodEntity } from '../../food/entities/food.entity';

/**
 * Database entity for recipes.
 * @property id            - The ID of the record.
 * @property published     - Whether the recipe has been published or not.
 * @property name          - The name of the recipe.
 * @property description   - A description of the recipe.
 * @property body          - The body of the recipe.
 * @property user          - The user that created the recipe.
 * @property ingredients   - The food items that the recipe uses.
 * @property createdAt     - The date the record was created.
 * @property updatedAt     - The date the record was updated.
 */
@Entity({ name: 'recipes' })
export class RecipeEntity {
  /**
   * The ID of the record.
   * @public
   */
  @PrimaryGeneratedColumn() id: number;

  /**
   * Whether the recipe has been published or not.
   * @public
   */
  @Column() published: boolean;

  /**
   * The name of the recipe.
   * @public
   */
  @Column() name: string;

  /**
   * A description of the recipe.
   * @public
   */
  @Column('mediumtext') description: string;

  /**
   * The body of the recipe.
   * @public
   */
  @Column('longtext') body: string;

  /**
   * The user that created the recipe.
   * @public
   */
  @ManyToOne(type => UserEntity, user => user.createdRecipes)
  user: UserEntity;

  /**
   * The food items that the recipe uses.
   * @public
   */
  @ManyToMany(type => FoodEntity, { cascade: true })
  @JoinTable()
  ingredients: FoodEntity[];

  /**
   * The date the record was created.
   * @public
   */
  @CreateDateColumn() createdAt: Date;

  /**
   * The date the record was updated.
   * @public
   */
  @UpdateDateColumn() updatedAt: Date;
}
