import { Router } from "express";
import * as setController from "@/controllers/set";

const router = Router({ mergeParams: true });
router.get("/", setController.listSets);
router.post("/", setController.createSet);
router.post("/bulk", setController.createSets);
router.get("/:id", setController.getSet);
router.put("/:id", setController.updateSet);
router.delete("/:id", setController.deleteSet);
export default router;
