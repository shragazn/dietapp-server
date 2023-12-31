import { Router } from "express";
import * as setController from "@/controllers/set";

const router = Router();
router.get("/:id", setController.getSet);
router.put("/:id", setController.updateSet);
router.delete("/:id", setController.deleteSet);
export default router;
