import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (payload: IBook) => {
  const result = await Book.create(payload);
  return result;
};

export const BookService = {
  createBook,
};
