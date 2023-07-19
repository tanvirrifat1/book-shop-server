import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

export const BookService = {
  createBook,
  getSingleBook,
};
