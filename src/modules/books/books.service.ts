import { AppError } from '@/error/AppError';
import { ControlKeyword } from '@/utils/ControlKeyword';
import { Injectable } from '@nestjs/common';
import { BookModel } from './book';
import { IBook } from './types/IBook';

@Injectable()
export class BooksService {
  controlKeyword = new ControlKeyword();

  async createBook({ title, author, available }: IBook): Promise<IBook> {
    // validação do título
    if (!this.controlKeyword.minOfKeyword(3, title)) {
      throw new AppError('O título deve conter no mínimo 3 caracteres');
    }
    if (!this.controlKeyword.maxOfKeyWord(60, title)) {
      throw new AppError('O título deve conter no máximo 60 caracteres');
    }

    // Validação do author
    if (!this.controlKeyword.minOfKeyword(3, author)) {
      throw new AppError('O nome deve conter no mínimo 3 caracteres');
    }
    if (!this.controlKeyword.maxOfKeyWord(60, author)) {
      throw new AppError('O nome deve conter no máximo 60 caracteres');
    }
    if (this.controlKeyword.ContainsNumber(author)) {
      throw new AppError('O nome deve conter apenas letras');
    }
    if (this.controlKeyword.ContainsSpecialCharacter(author)) {
      throw new AppError('O nome deve conter apenas letras');
    }

    // Validação available
    if (typeof available !== 'boolean') {
      throw new AppError('available deve ser true ou false');
    }

    const newBook: IBook = { author, available, title };

    await BookModel.create(newBook);

    return newBook;
  }

  async getAllBooks() {
    const books = await BookModel.find();
    return books;
  }
  async getAllBooksAvailable() {
    const books = await BookModel.find({ available: true });
    return books;
  }

  async getBookById(_id: string) {
    const book = await BookModel.findOne({ _id });
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }
    return book;
  }

  async updateBookById({
    _id,
    title,
    author,
    available,
  }: IBook): Promise<IBook> {
    const book = await BookModel.findOne({ _id });
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    // validação do título
    if (!this.controlKeyword.minOfKeyword(3, title)) {
      throw new AppError('O título deve conter no mínimo 3 caracteres');
    }
    if (!this.controlKeyword.maxOfKeyWord(60, title)) {
      throw new AppError('O título deve conter no máximo 60 caracteres');
    }

    // Validação do author
    if (!this.controlKeyword.minOfKeyword(3, author)) {
      throw new AppError('O nome deve conter no mínimo 3 caracteres');
    }
    if (!this.controlKeyword.maxOfKeyWord(60, author)) {
      throw new AppError('O nome deve conter no máximo 60 caracteres');
    }
    if (this.controlKeyword.ContainsNumber(author)) {
      throw new AppError('O nome deve conter apenas letras');
    }
    if (this.controlKeyword.ContainsSpecialCharacter(author)) {
      throw new AppError('O nome deve conter apenas letras');
    }

    // Validação available
    if (typeof available !== 'boolean') {
      throw new AppError('available deve ser true ou false');
    }

    const updateBook: IBook = { _id, author, available, title };

    await BookModel.updateOne({ _id }, updateBook);
    return updateBook;
  }

  async deleteBook(_id: string) {
    const book = await BookModel.findOne({ _id });
    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    await BookModel.deleteOne({ _id });
  }
}
