import * as exerciseController from "@/controllers/exercise";
import { Router } from "express";

const router = Router({ mergeParams: true });
router.get("/", exerciseController.listExercises);
router.post("/", exerciseController.createExercise);
export default router;
