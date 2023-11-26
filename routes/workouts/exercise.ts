import { Router } from "express";
import set from "./set";
import * as exerciseController from "@/controllers/exercise";
import * as setController from "@/controllers/set";

const router = Router({ mergeParams: true });
router.get("/", exerciseController.listExercises);
router.post("/", exerciseController.createExercise);
router.get("/:id", exerciseController.getExercise);
router.put("/:id", exerciseController.updateExercise);
router.delete("/:id", exerciseController.deleteExercise);
router.use("/:exerciseId/set", set);
router.get("/name", setController.listByExercise);
export default router;
