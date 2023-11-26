import * as db from "@db/index";
import { Request, Response } from "express";

export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const workout = await db.getWorkout(id);
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  const { date } = req.body;
  const userId = req.user!.id;
  if (!date) return res.status(400).json({ error: "date is required" });

  try {
    const workout = db.createWorkout({ userId, date });
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date } = req.body;
  if (!id) return res.status(400).json({ error: "id is required" });
  if (!date) return res.status(400).json({ error: "date is required" });

  try {
    const workout = db.updateWorkout({ date, id });
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = db.deleteWorkout(id);
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkouts = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const workouts = await db.listWorkouts(userId);
    res.json(workouts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
