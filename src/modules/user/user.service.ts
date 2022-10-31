import { AppError } from '@/error/AppError';
import { ControlKeyword } from '@/utils/ControlKeyword';
import { Injectable } from '@nestjs/common';
import { IUser } from './types/IUser';
import { UserModel } from './user';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  controlKeyword = new ControlKeyword();
  async createUser({ type, email, name, password }: IUser): Promise<IUser> {
    // Validação no nome
    if (!this.controlKeyword.minOfKeyword(5, name)) {
      throw new AppError('O nome deve conter no mínimo 5 caracteres');
    }

    if (!this.controlKeyword.maxOfKeyWord(100, name)) {
      throw new AppError('O nome deve conter no máximo 100 caracteres');
    }

    if (
      this.controlKeyword.ContainsNumber(name) ||
      this.controlKeyword.ContainsSpecialCharacter(name)
    ) {
      throw new AppError('O nome deve conter apenas letras');
    }

    // Validação no email
    if (!this.controlKeyword.minOfKeyword(5, email)) {
      throw new AppError('O email deve conter no mínimo 5 caracteres');
    }

    if (!this.controlKeyword.maxOfKeyWord(100, email)) {
      throw new AppError('O email deve conter no máximo 100 caracteres');
    }

    const emailExist = await UserModel.findOne({ email: email });

    if (emailExist) {
      throw new AppError('Email já está em uso');
    }

    // Validação no password
    if (!this.controlKeyword.minOfKeyword(8, password)) {
      throw new AppError('A senha deve conter no mínimo 8 caracteres');
    }

    if (!this.controlKeyword.ContainsNumber(password)) {
      throw new AppError('A senha deve conter no mínimo 1 número');
    }

    if (!this.controlKeyword.ContainsLowcase(password)) {
      throw new AppError('A senha deve conter no mínimo 1 letra minúscula');
    }

    if (!this.controlKeyword.ContainsUppercase(password)) {
      throw new AppError('A senha deve conter no mínimo 1 letra maiúscula');
    }

    if (!this.controlKeyword.ContainsSpecialCharacter(password)) {
      throw new AppError('A senha deve conter no mínimo 1 letra símbolo');
    }

    // Validação do type
    if (type !== 'cliente' && type !== 'administrador') {
      throw new AppError('Role invalida');
    }

    const hashedPassword = await hash(password, 8);

    const newUser: IUser = {
      email,
      type,
      name,
      password: hashedPassword,
    };

    await UserModel.create(newUser);

    return newUser;
  }
}
