import routerx from "express-promise-router";
import SaleController from "../controllers/SaleController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifySeller, SaleController.add);
router.get("/query", auth.verifySeller, SaleController.query);
router.get("/list", auth.verifySeller, SaleController.list);
router.get("/report-12-months", auth.verifyUser, SaleController.report12Months);
router.get("/query-dates", auth.verifyUser, SaleController.queryDates);
/* router.put("/update", auth.verifySeller, SaleController.update);
router.delete("/remove", auth.verifySeller, SaleController.remove); */
router.put("/activate", auth.verifySeller, SaleController.activate);
router.put("/deactivate", auth.verifySeller, SaleController.deactivate);

export default router;
