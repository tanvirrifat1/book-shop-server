import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./book.interface";
import httpStatus from "http-status";
import pick from "../../../pagination/pick";
import {
  BookFilterableFields,
  paginationFields,
} from "../../../pagination/pagination";

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

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const email = req.query.email;

  const result = await BookService.deleteBook(id, email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully !",
    data: result,
  });
});

const updateBook = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BookService.updateBook(id, updatedData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  })
);

const getALLBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getALLBook(filters, paginationOptions);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Books retrieved successfully ",
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  getALLBook,
};
