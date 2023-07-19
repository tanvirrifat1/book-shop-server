import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: string;
  reviews?: string[];
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IBookFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: Location;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
