/**
 * The format that pagination data is returned in.
 * @property data     - The data that was fetched.
 * @property page     - The page number of data that was fetched.
 * @property next     - The page number of the next page of data.
 * @property previous - The page number of the previous page of data.
 */
export class Pagination {
  data: any[];
  page: number;
  next: number;
  previous: number;
}
