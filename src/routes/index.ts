import express from "express";
import { BookRouter } from "../app/modules/Books/book.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/books",
    route: BookRouter,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
