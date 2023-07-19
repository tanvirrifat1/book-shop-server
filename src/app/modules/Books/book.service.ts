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

const deleteBook = async (
  id: string,
  email: string | undefined
): Promise<Partial<IBook> | undefined | null> => {
  console.log("match email", email);
  const matchBook = await Book.findById(id);

  if (matchBook?.user === email) {
    console.log(
      "🚀 ~ file: book.services.ts:25 ~ deleteBook ~ matchBook:",
      matchBook
    );
    const result = await Book.findByIdAndDelete(id);
    return result;
  }
};

export const BookService = {
  createBook,
  getSingleBook,
  deleteBook,
};
