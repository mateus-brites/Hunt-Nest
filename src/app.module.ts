import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppError } from './error/AppError';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [UserModule, AppError, LoginModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
