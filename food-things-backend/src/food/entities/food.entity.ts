import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import * as slug from 'slug';
import { UserEntity } from '../../users/entities/user.entity';
import { RecipeEntity } from '../../recipes/entitities/recipe.entity';

/**
 * Database entity for food.
 * @property id              - The ID of the record.
 * @property slug            - An auto-generated slug for the food item.
 * @property name            - The name of the food.
 * @property description     - A description of the food.
 * @property calories        - The number of calories per 100g.
 * @property carbs           - The weight of carbs per 100g.
 * @property protein         - The weight of protein per 100g.
 * @property fat             - The weight of fat per 100g.
 * @property createdAt       - The date the record was created.
 * @property updatedAt       - The date the record was updated.
 * @property user            - The user that created the food item.
 * @property recipes         - The recipes that use the food item.
 * @property interestedUsers - The user's interested in this food item.
 */
@Entity({ name: 'food' })
export class FoodEntity {
  /**
   * The ID of the record.
   * @public
   */
  @PrimaryGeneratedColumn() id: number;

  /**
   * An auto-generated slug for the food item.
   * @public
   */
  @Column() slug: string;

  /**
   * The name of the food.
   * @public
   */
  @Column() name: string;

  /**
   * A description of the food.
   * @public
   */
  @Column('longtext') description: string;

  /**
   * The number of calories per 100g.
   * @public
   */
  @Column('float') calories: number;

  /**
   * The weight of carbs per 100g.
   * @public
   */
  @Column('float') carbs: number;

  /**
   * The weight of protein per 100g.
   * @public
   */
  @Column('float') protein: number;

  /**
   * The weight of fat per 100g.
   * @public
   */
  @Column('float') fat: number;

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
   * The user that created the food item.
   * @public
   */
  @ManyToOne(type => UserEntity, user => user.createdFoodItems)
  user: UserEntity;

  /**
   * The recipes using this food item.
   * @public
   */
  @ManyToMany(type => RecipeEntity, { cascade: true })
  recipes: RecipeEntity[];

  /**
   * The users interested in this food item.
   * @public
   */
  @ManyToMany(type => UserEntity, { cascade: true })
  interestedUsers: UserEntity[];

  /**
   * Generates a slug from the name of the food item.
   * @private
   * @example this._generateSlug()
   */
  @BeforeInsert()
  @BeforeUpdate()
  private _generateSlug(): void {
    this.slug = slug(this.name, { lower: true });
  }
}
