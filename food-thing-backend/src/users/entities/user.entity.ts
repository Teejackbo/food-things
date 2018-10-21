import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { FoodEntity } from '../../food/entities/food.entity';
import { RecipeEntity } from '../../recipes/entitities/recipe.entity';

/**
 * Database entity for users.
 * @property id                    - The ID of the record.
 * @property first_name            - The user's first name.
 * @property last_name             - The user's last name.
 * @property email                 - The user's email. Unique column.
 * @property username              - The user's username. Unique column.
 * @property password              - The user's password in hashed format.
 * @property token                 - The user's access token for the API.
 * @property permissions           - The user's permission level.
 * @property createdAt             - The date the record was created.
 * @property updatedAt             - The date the record was updated.
 * @property createdFoodItems      - The food items that the user has created.
 * @property createdRecipes        - The recipes that the user has created.
 * @property interestedFood        - The food items that the user wants to see recipes for.
 */
@Entity({ name: 'users' })
export class UserEntity {
  /**
   * The ID of the record.
   * @public
   */
  @PrimaryGeneratedColumn() id: number;

  /**
   * The user's first name.
   * @public
   */
  @Column() first_name: string;

  /**
   * The user's last name.
   * @public
   */
  @Column() last_name: string;

  /**
   * The user's email. Unique column.
   * @public
   */
  @Column({ unique: true })
  email: string;

  /**
   * The user's username. Unique column.
   * @public
   */
  @Column({ unique: true })
  username: string;

  /**
   * The user's password in hashed format.
   * @public
   */
  @Column() password: string;

  /**
   * The user's access token for the API. Regenerated after logout.
   * @public
   */
  @Column() token: string;

  /**
   * The user's permission level.
   * @public
   */
  @Column() permissions: number;

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

  /**
   * The food items that the user has created.
   * @public
   */
  @OneToMany(type => FoodEntity, food => food.user, { cascade: true })
  createdFoodItems: FoodEntity[];

  /**
   * The recipes that the user has created.
   * @public
   */
  @OneToMany(type => RecipeEntity, recipe => recipe.user, { cascade: true })
  createdRecipes: FoodEntity[];

  /**
   * The food items that the user wants to see recipes for.
   * @public
   */
  @ManyToMany(type => FoodEntity, { cascade: true })
  @JoinTable()
  interestedFood: FoodEntity[];

  /**
   * Sets the users permission level to 1 by default.
   * @public
   */
  @BeforeInsert()
  setPermissions() {
    this.permissions = 1;
  }
}
