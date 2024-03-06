import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { HousesController } from './houses/houses.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController, UsersController, HousesController],
  providers: [AppService, UsersService],
})
export class AppModule {}
