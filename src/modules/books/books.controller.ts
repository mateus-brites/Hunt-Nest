import { AcessControll } from '@/utils/AcessControll';
import { JwtAuthGuard } from '@modules/login/jwt-auth.guard';
import { IJwt } from '@modules/login/types/IJwt';
import { UserModel } from '@modules/user/user';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { BooksService } from './books.service';
import { IBook } from './types/IBook';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  booksService = new BooksService();

  @Get()
  async getAll(@Req() request: Request, @Res() response: Response) {
    try {
      const books = await this.booksService.getAllBooks();

      return response.status(200).json(books);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }
  @Get('available')
  async getAllAvailable(@Req() request: Request, @Res() response: Response) {
    try {
      const books = await this.booksService.getAllBooksAvailable();

      return response.status(200).json(books);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }

  @Get('findById/:id')
  async getById(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;

    try {
      const book = await this.booksService.getBookById(id as string);
      return response.status(200).json(book);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }

  @Put('/:id')
  async editById(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;
    const { author, available, title }: IBook = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(' ');

    const isAdmin = await AcessControll(token, 'administrador');

    if (!isAdmin) {
      return response.status(403).json({ message: 'Unauthorized' });
    }

    try {
      const updatedBook = await this.booksService.updateBookById({
        _id: id,
        title,
        available,
        author,
      });
      return response.status(201).json(updatedBook);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }

  @Put('available/:id')
  async reserveBook(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(' ');

    const isCliente = await AcessControll(token, 'cliente');

    if (!isCliente) {
      return response.status(403).json({ message: 'Unauthorized' });
    }

    try {
      const book = await this.booksService.getBookById(id);
      const updateBook: IBook = {
        _id: book.id,
        author: book.author,
        available: !book.available,
        title: book.title,
      };

      const updatedBook = await this.booksService.updateBookById(updateBook);

      return response.status(201).json(updatedBook);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }

  @Post()
  async createBook(@Req() request: Request, @Res() response: Response) {
    const { author, available, title }: IBook = request.body;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(' ');

    const isAdmin = await AcessControll(token, 'administrador');

    if (!isAdmin) {
      return response.status(403).json({ message: 'Unauthorized' });
    }

    try {
      const book = await this.booksService.createBook({
        author,
        title,
        available,
      });

      return response.status(201).json(book);
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }

  @Delete(':id')
  async deleteBook(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;

    const authToken = request.headers.authorization;
    const [, token] = authToken.split(' ');

    const isAdmin = await AcessControll(token, 'administrador');

    if (!isAdmin) {
      return response.status(403).json({ message: 'Unauthorized' });
    }

    try {
      await this.booksService.deleteBook(id);
      return response.status(204).send();
    } catch (err) {
      return response.status(err.statuscode).json(err.message);
    }
  }
}
