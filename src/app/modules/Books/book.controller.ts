import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./book.interface";
import httpStatus from "http-status";

const createBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookData = req.body;

    const result = await BookService.createBook(bookData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book created successfully!",
      data: result,
    });
  }
);

const getSingleBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await BookService.getSingleBook(id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book retrieved successfully!",
      data: result,
    });
  }
);

export const BookController = {
  createBook,
  getSingleBook,
};
