import { Router } from "express";
import * as setController from "@/controllers/set";

const router = Router({ mergeParams: true });
router.get("/", setController.listSets);
router.post("/", setController.createSet);
router.post("/bulk", setController.createSets);
export default router;
