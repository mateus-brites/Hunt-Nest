import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from './login.service';
import { ILogIn } from './types/ILogIn';

@Controller('login')
export class LoginController {
  logInService = new LoginService();
  @Post()
  async logInUser(@Req() request: Request, @Res() response: Response) {
    const { email, password }: ILogIn = request.body;

    try {
      const token = await this.logInService.logInUser({ email, password });
      return response.status(200).json(token);
    } catch (err) {
      return response.status(404).json(err);
    }
  }
}
