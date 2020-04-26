import routerx from "express-promise-router";
import ItemController from "../controllers/ItemController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyGrocer, ItemController.add);
router.get("/query", auth.verifyGrocer, ItemController.query);
router.get("/query-code", auth.verifyUser, ItemController.queryCode);
router.get("/list", auth.verifyGrocer, ItemController.list);
router.put("/update", auth.verifyGrocer, ItemController.update);
router.delete("/remove", auth.verifyGrocer, ItemController.remove);
router.put("/activate", auth.verifyGrocer, ItemController.activate);
router.put("/deactivate", auth.verifyGrocer, ItemController.deactivate);

export default router;
