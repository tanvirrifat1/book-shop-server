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
  const matchBook = await Book.findById(id);

  if (matchBook?.user === email) {
    console.log("matchBook:email", matchBook);
    const result = await Book.findByIdAndDelete(id);
    return result;
  }
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const BookService = {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
};
