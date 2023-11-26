import * as workoutsController from "@/controllers/workout";
import { Router } from "express";
import exercise from "./exercise";

const router = Router();
router.get("/", workoutsController.getWorkouts);
router.post("/", workoutsController.createWorkout);
router.get("/:id", workoutsController.getWorkout);
router.put("/:id", workoutsController.updateWorkout);
router.delete("/:id", workoutsController.deleteWorkout);
router.use("/:workoutId/exercise", exercise);
export default router;
