import { AppError } from '@/error/AppError';
import { UserModel } from '@modules/user/user';
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [AppError, UserModel],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
