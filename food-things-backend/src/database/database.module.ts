import { Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';

/**
 * A module to assist with common database operations, such as pagination.
 */
@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class DatabaseModule {}
