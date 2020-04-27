import routerx from "express-promise-router";
import IncomeController from "../controllers/IncomeController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyGrocer, IncomeController.add);
router.get("/query", auth.verifyGrocer, IncomeController.query);
router.get("/list", auth.verifyGrocer, IncomeController.list);
router.get(
  "/report-12-months",
  auth.verifyUser,
  IncomeController.report12Months
);
router.get("/query-dates", auth.verifyUser, IncomeController.queryDates);
/* router.put("/update", auth.verifyGrocer, IncomeController.update);
router.delete("/remove", auth.verifyGrocer, IncomeController.remove); */
router.put("/activate", auth.verifyGrocer, IncomeController.activate);
router.put("/deactivate", auth.verifyGrocer, IncomeController.deactivate);

export default router;
