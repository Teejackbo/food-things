import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pagination } from '../pagination';

/**
 * A service to provide pagination features.
 */
@Injectable()
export class PaginationService {
  /**
   * Fetches the actual data from the database.
   * @async
   * @private
   * @param repository The repository to use for fetching.
   * @param numberToSkip The number of database entries to skip.
   * @param amountToSelect The number of database entries to select.
   * @returns The data that was fetched.
   */
  private async _fetchData(
    repository: Repository<any>,
    numberToSkip: number,
    amountToSelect: number,
  ) {
    return repository
      .createQueryBuilder()
      .skip(numberToSkip)
      .take(amountToSelect)
      .getManyAndCount();
  }

  /**
   * Fetches data and provides pagination metadata.
   * @async
   * @param page The page of data to fetch.
   * @param amountToSelect The number of records to fetch.
   * @param repository The repository to use to fetch the data.
   * @returns The data that was fetched and pagination metadata.
   */
  async paginate(
    page: number = 1,
    amountToSelect: number = 10,
    repository: Repository<any>,
  ): Promise<Pagination> {
    const numberToSkip = (page - 1) * amountToSelect;
    const totalUsed = numberToSkip + amountToSelect;
    const [data, count] = await this._fetchData(
      repository,
      numberToSkip,
      amountToSelect,
    );

    if (!data.length) throw new NotFoundException();
    const next = totalUsed >= count ? page : page + 1;
    const previous = page === 1 ? 1 : page - 1;

    const dataToReturn: Pagination = {
      data,
      page,
      next,
      previous,
    };
    return dataToReturn;
  }
}
