import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from '../entitities/recipe.entity';
import { CreateRecipeDTO } from '../dto/create-recipe.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { UpdateRecipeDTO } from '../dto/update-recipe.dto';

/**
 * A service to handle the CRUD functionality of recipes.
 * @property _recipeRepository - The repository for interacting with the recipes table. Injected by Nest.
 */
@Injectable()
export class RecipeService {
  /**
   * The constructor for the RecipeService.
   * @constructor
   * @param _recipeRepository The repository for interacting with the recipes table. Injected by Nest.
   */
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly _recipeRepository: Repository<RecipeEntity>,
  ) {}

  /**
   * Stores a new recipe in the database.
   * @async
   * @example await this._recipeService.create(data);
   * @param user The user that created the recipe.
   * @param foodData The recipe data to store.
   * @returns The record that was saved.
   */
  async create(
    user: UserEntity,
    recipeData: CreateRecipeDTO,
  ): Promise<RecipeEntity> {
    const recipe = await this._recipeRepository.create(recipeData);
    recipe.user = user;
    return this._recipeRepository.save(recipe);
  }

  /**
   * Updates a recipe.
   * @async
   * @param recipe The recipe to update.
   * @param recipe The data to update the recipe with.
   * @returns The updated recipe.
   */
  async update(
    recipe: RecipeEntity,
    recipeData: UpdateRecipeDTO,
  ): Promise<RecipeEntity> {
    await this._recipeRepository.merge(recipe, recipeData);
    return this._recipeRepository.save(recipe);
  }

  /**
   * Deletes a recipe.
   * @async
   * @param recipe The recipe to delete.
   */
  async delete(recipe: RecipeEntity): Promise<void> {
    await this._recipeRepository.delete(recipe.id);
  }
}
