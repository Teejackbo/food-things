import { UsePipes, ValidationPipe } from '@nestjs/common';

export const Validate = (skip?: 'SkipMissing') =>
  UsePipes(new ValidationPipe({ skipMissingProperties: skip ? true : false }));
