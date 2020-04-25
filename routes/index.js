import routerx from "express-promise-router";
import CategoryRouter from "./Category";
import ItemRouter from "./Item";
import UserRouter from "./User";

const router = routerx();

router.use("/category", CategoryRouter);
router.use("/item", ItemRouter);
router.use("/user", UserRouter);

export default router;
