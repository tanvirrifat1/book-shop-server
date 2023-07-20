"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.delete("/:id", book_controller_1.BookController.deleteBook);
router.patch("/:id", (0, validationRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBook);
router.get("/", book_controller_1.BookController.getALLBook);
// review
router.post("/Review/:id", book_controller_1.BookController.postReviews);
router.get("/Review/:id", book_controller_1.BookController.getReview);
exports.BookRouter = router;
