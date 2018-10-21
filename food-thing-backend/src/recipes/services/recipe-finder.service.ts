import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from '../entitities/recipe.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { RecipePagination } from '../entitities/recipe.pagination';
import { PaginationService } from '../../database/services/pagination.service';

/**
 * A service to find recipes.
 * @property _recipeRepository - The repository for interacting with the recipes table. Injected by Nest.
 * @property _paginationService - An instance of the PaginationService. Injected by Nest.
 */
@Injectable()
export class RecipeFinderService {
  /**
   * Constructor for the RecipeFinderService.
   * @constructor
   * @param _recipeRepository The repository for interacting with the recipes table. Injected by Nest.
   * @param _paginationService An instance of the PaginationService. Injected by Nest.
   */
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly _recipeRepository: Repository<RecipeEntity>,
    private readonly _paginationService: PaginationService,
  ) {}

  /**
   * Finds a recipe by an ID.
   * @throws Throws a NotFoundException if the recipe can't be found.
   * @param id The ID of the recipe to retrieve.
   * @returns The recipe that was found.
   */
  async findById(id: number | string): Promise<RecipeEntity> {
    const recipe = await this._recipeRepository.findOne(id);
    if (!recipe) throw new NotFoundException();
    return recipe;
  }

  /**
   * Returns recipe data in a paginated format.
   * @param page The page to select.
   * @param amountToSelect The number of recipes on each page.
   * @returns The recipes and metadata to do with the page numbers.
   */
  async paginate(
    page: number = 1,
    amountToSelect: number = 10,
  ): Promise<RecipePagination> {
    return this._paginationService.paginate(
      page,
      amountToSelect,
      this._recipeRepository,
    );
  }

  /**
   * Finds the user who created a recipe.
   * @throws Throws a NotFoundException if the recipe cant be found.
   * @param id The ID of the recipe.
   * @returns The user who created the recipe.
   */
  async findUser(id: number): Promise<UserEntity> {
    const recipe = await this._recipeRepository.findOne(id, {
      relations: ['user'],
    });
    if (!recipe) throw new NotFoundException();
    return recipe.user;
  }
}
