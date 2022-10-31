import { AppError } from '@/error/AppError';
import { UserModel } from '@modules/user/user';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    AppError,
    UserModel,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '15d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtService, JwtStrategy],
})
export class LoginModule {}
