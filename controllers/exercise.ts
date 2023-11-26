import { Request, Response } from "express";
import * as db from "@db/index";

export const getExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const exercise = await db.getExercise(id);
    res.json(exercise);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listExercises = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  if (!workoutId)
    return res.status(400).json({ error: "workoutId is required" });

  try {
    const exercises = await db.listExercises(workoutId);
    res.json(exercises);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  if (!workoutId)
    return res.status(400).json({ error: "workoutId is required" });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const exercise = await db.createExercise({ workoutId, name });
    res.json(exercise);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const exercise = await db.updateExercise({ id, name });
    res.json(exercise);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const exercise = await db.deleteExercise(id);
    res.json(exercise);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
