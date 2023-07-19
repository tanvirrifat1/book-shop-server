import { SortOrder } from "mongoose";
import { IBook, IBookFilters, IPaginationOptions } from "./book.interface";
import { Book } from "./book.model";
import { IGenericPaginationResponse } from "../../interface/ICommon";

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

const getALLBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<Partial<IBook[]>>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log(filtersData);

  const page = Number(paginationOptions.page || 1);
  const limit = Number(paginationOptions.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = paginationOptions.sortBy || "createdAt";
  const sortOrder = paginationOptions.sortOrder || "desc";

  const BookSearchableFields = ["title", "genre", "author"];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  getALLBook,
};
