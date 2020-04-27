import routerx from "express-promise-router";
import CategoryRouter from "./Category";
import ItemRouter from "./Item";
import UserRouter from "./User";
import PersonRouter from "./Person";
import IncomeRouter from "./Income";
import SaleRouter from "./Sale";

const router = routerx();

router.use("/category", CategoryRouter);
router.use("/item", ItemRouter);
router.use("/user", UserRouter);
router.use("/person", PersonRouter);
router.use("/income", IncomeRouter);
router.use("/sale", SaleRouter);

export default router;
