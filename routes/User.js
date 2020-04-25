import routerx from "express-promise-router";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const router = routerx();

router.post("/add", auth.verifyAdmin, UserController.add);
router.get("/query", auth.verifyAdmin, UserController.query);
router.get("/list", auth.verifyAdmin, UserController.list);
router.put("/update", auth.verifyAdmin, UserController.update);
router.delete("/remove", auth.verifyAdmin, UserController.remove);
router.put("/activate", auth.verifyAdmin, UserController.activate);
router.put("/deactivate", auth.verifyAdmin, UserController.deactivate);
router.post("/login", UserController.login);

export default router;
