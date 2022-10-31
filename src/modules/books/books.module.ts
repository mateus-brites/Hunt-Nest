import { AppError } from '@/error/AppError';
import { UserModel } from '@modules/user/user';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [AppError, UserModel],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
