import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { AppError } from './error/AppError';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await mongoose.connect(
    `mongodb://Hunt_user:Hunt_pass@localhost:27017/Hunt?directConnection=true&authSource=admin&replicaSet=replicaset&retryWrites=true`,
  );

  app.use(passport.initialize());
  await app.listen(3000);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statuscode).json({ message: err.message });
      }

      return response.status(500).json({
        status: 'Error',
        message: `Internal server Error ${err}`,
      });
    },
  );
}
bootstrap();
