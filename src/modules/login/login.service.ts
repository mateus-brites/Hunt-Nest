import { Injectable } from '@nestjs/common';
import { ILogIn } from './types/ILogIn';
import { sign } from 'jsonwebtoken';
import { UserModel } from '@modules/user/user';
import { IUser } from '@modules/user/types/IUser';
import { AppError } from '@/error/AppError';
import { compare } from 'bcryptjs';

@Injectable()
export class LoginService {
  async logInUser({ email, password }: ILogIn): Promise<string> {
    const findUserByEmail: IUser = await UserModel.findOne({ email });
    console.log(findUserByEmail);

    if (!findUserByEmail) {
      console.log('not found');
      throw new AppError('Email or password incorrect', 400);
    }

    const passwordHashed = findUserByEmail.password;

    const passwordMath = await compare(password, passwordHashed);

    if (!passwordMath) {
      console.log('not found');
      throw new AppError('Email or password incorrect', 400);
    }

    const token = sign(
      { userId: findUserByEmail._id },
      '6eb51784aeb24e7fed5ce4fe9f27b0bd',
      {
        subject: String(findUserByEmail._id),
        expiresIn: '15d',
      },
    );

    return token;
  }
}
