import routerx from "express-promise-router";
import PersonController from "../controllers/PersonController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyUser, PersonController.add);
router.get("/query", auth.verifyUser, PersonController.query);
router.get("/list", auth.verifyUser, PersonController.list);
router.get("/list-customers", auth.verifyUser, PersonController.listCustomers);
router.get("/list-providers", auth.verifyUser, PersonController.listProviders);
router.put("/update", auth.verifyUser, PersonController.update);
router.delete("/remove", auth.verifyUser, PersonController.remove);
router.put("/activate", auth.verifyUser, PersonController.activate);
router.put("/deactivate", auth.verifyUser, PersonController.deactivate);

export default router;
