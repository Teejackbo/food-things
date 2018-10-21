import { RecipeEntity } from './recipe.entity';
import { Pagination } from '../../database/pagination';

export class RecipePagination extends Pagination {
  data: RecipeEntity[];
}
