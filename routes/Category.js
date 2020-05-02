import routerx from "express-promise-router";
import CategoryController from "../controllers/CategoryController";
import auth from "../middlewares/auth";

const router = routerx();

//router.post("/add", CategoryController.add);
router.post("/add", auth.verifyGrocer, CategoryController.add);
router.get("/query", auth.verifyGrocer, CategoryController.query);
router.get("/list", auth.verifyGrocer, CategoryController.list);
//router.get("/list", CategoryController.list);
router.put("/update", auth.verifyGrocer, CategoryController.update);
//router.put("/update", CategoryController.update);
router.delete("/remove", auth.verifyGrocer, CategoryController.remove);
router.put("/activate", auth.verifyGrocer, CategoryController.activate);
router.put("/deactivate", auth.verifyGrocer, CategoryController.deactivate);
//router.put("/activate", CategoryController.activate);
//router.put("/deactivate", CategoryController.deactivate);

export default router;
