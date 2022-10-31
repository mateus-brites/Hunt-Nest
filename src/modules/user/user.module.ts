import { AppError } from '@/error/AppError';
import { Module } from '@nestjs/common';
import { UserModel } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AppError, UserModel],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
