import express from "express";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/main",
    route: UserRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
