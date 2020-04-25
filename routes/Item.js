import routerx from "express-promise-router";
import ItemController from "../controllers/ItemController";

const router = routerx();

router.post("/add", ItemController.add);
router.get("/query", ItemController.query);
router.get("/list", ItemController.list);
router.put("/update", ItemController.update);
router.delete("/remove", ItemController.remove);
router.put("/activate", ItemController.activate);
router.put("/deactivate", ItemController.deactivate);

export default router;
