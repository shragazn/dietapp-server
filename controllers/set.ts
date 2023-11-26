import * as db from "@db/index";
import { Request, Response } from "express";

export const listSets = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  if (!exerciseId)
    return res.status(400).json({ error: "exerciseId is required" });

  try {
    const sets = await db.listSets(exerciseId);
    res.json(sets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const set = await db.getSet(id);
    res.json(set);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSet = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  if (!exerciseId)
    return res.status(400).json({ error: "exerciseId is required" });
  const { reps, weight } = req.body;
  if (!reps) return res.status(400).json({ error: "reps is required" });
  if (!weight) return res.status(400).json({ error: "weight is required" });

  try {
    const set = await db.createSet({ exerciseId, reps, weight });
    res.json(set);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSets = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  if (!exerciseId)
    return res.status(400).json({ error: "exerciseId is required" });
  const { sets } = req.body;
  if (!sets) return res.status(400).json({ error: "sets is required" });

  try {
    const createdSets = await db.createSets({ exerciseId, sets });
    res.json(createdSets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });
  const { reps, weight } = req.body;
  if (!reps) return res.status(400).json({ error: "reps is required" });
  if (!weight) return res.status(400).json({ error: "weight is required" });

  try {
    const set = await db.updateSet({ id, reps, weight });
    res.json(set);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const set = await db.deleteSet(id);
    res.json(set);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listByExercise = async (req: Request, res: Response) => {
  const { exerciseName } = req.body;
  const userId = req.user!.id;
  if (!exerciseName) return res.status(400).json({ error: "name is required" });

  try {
    const sets = await db.listSetsByExercise({ exerciseName, userId });
    res.json(sets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
