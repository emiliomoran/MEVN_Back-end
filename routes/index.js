import routerx from "express-promise-router";
import CategoryRouter from "./Category";

const router = routerx();

router.use("/category", CategoryRouter);

export default router;
