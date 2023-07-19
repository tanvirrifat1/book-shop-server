import express from "express";
import validateRequest from "../middlewares/validationRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = express.Router();

router.post(
  "/createBook",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get("/:id", BookController.getSingleBook);

router.delete("/:id", BookController.deleteBook);

export const BookRouter = router;
