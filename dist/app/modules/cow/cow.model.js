"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModel = void 0;
const mongoose_1 = require("mongoose");
const cow_interface_1 = require("./cow.interface");
const CowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: {
        type: Number,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: Object.values(cow_interface_1.Location),
        required: true,
    },
    breed: {
        type: String,
        enum: Object.values(cow_interface_1.Breed),
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: Object.values(cow_interface_1.Label),
        default: cow_interface_1.Label.ForSale,
    },
    category: {
        type: String,
        enum: Object.values(cow_interface_1.Category),
        required: true,
        unique: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.CowModel = (0, mongoose_1.model)("Cow", CowSchema);
