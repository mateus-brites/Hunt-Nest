import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from './types/IUser';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  userService = new UserService();
  @Post()
  async createUser(@Req() request: Request, @Res() response: Response) {
    const { email, name, password, type }: IUser = request.body;
    try {
      const newUser = await this.userService.createUser({
        email,
        name,
        password,
        type,
      });
      console.log(newUser);
      return response.status(201).json(newUser);
    } catch (err) {
      console.log({ err });
      return response.status(400).json(err);
    }
  }
}
