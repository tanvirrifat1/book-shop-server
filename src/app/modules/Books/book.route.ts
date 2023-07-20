import express from "express";
import validateRequest from "../middlewares/validationRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get("/:id", BookController.getSingleBook);

router.delete("/:id", BookController.deleteBook);

router.patch(
  "/:id",
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.get("/", BookController.getALLBook);

// review

router.post("/Review/:id", BookController.postReviews);

router.get("/Review/:id", BookController.getReview);

export const BookRouter = router;
