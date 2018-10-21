import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { SecurityModule } from 'security/security.module';
import { FoodModule } from 'food/food.module';
import { RecipesModule } from 'recipes/recipes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SecurityModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    FoodModule,
    RecipesModule,
  ],
})
export class AppModule {}
