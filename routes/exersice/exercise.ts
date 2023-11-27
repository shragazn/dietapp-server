import { Router } from "express";
import * as exerciseController from "@/controllers/exercise";
import set from "./set";

const router = Router();
router.get("/", exerciseController.listExercisesByName);
router.get("/:id", exerciseController.getExercise);
router.put("/:id", exerciseController.updateExercise);
router.delete("/:id", exerciseController.deleteExercise);
router.use("/:exerciseId/set", set);
export default router;
