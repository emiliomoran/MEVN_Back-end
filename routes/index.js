import routerx from "express-promise-router";
import CategoryRouter from "./Category";
import ItemRouter from "./Item";

const router = routerx();

router.use("/category", CategoryRouter);
router.use("/item", ItemRouter);

export default router;
