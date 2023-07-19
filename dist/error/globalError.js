"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const globalErrorHandler = (error, req, res, next) => {
    let message = "Something went wrong";
    let errorMessages = [];
    if (error instanceof mongoose_1.MongooseError || (error === null || error === void 0 ? void 0 : error.code) === 11000) {
        message = error.message;
        errorMessages = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const arrangedError = Object.values(error === null || error === void 0 ? void 0 : error.errors).map((err) => {
            console.log(err);
            return {
                path: err === null || err === void 0 ? void 0 : err.path,
                message: err === null || err === void 0 ? void 0 : err.message,
            };
        });
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = arrangedError;
    }
    res.status(500).json({
        success: false,
        message,
        errorMessages,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error === null || error === void 0 ? void 0 : error.stack : "No stack found",
    });
};
exports.default = globalErrorHandler;
