import * as db from "@db/index";
import { Workout } from "@prisma/client";
import { Request, Response } from "express";

const workoutResponse = (workout: Workout, req: Request) => {
  return {
    data: workout,
    message: "Workout found",
    actions: [
      {
        label: "View",
        url: `/workout/${workout.id}`,
        method: "GET",
      },
      {
        label: "Update",
        url: `/workout/${workout.id}`,
        method: "PUT",
      },
      {
        label: "Delete",
        url: `/workout/${workout.id}`,
        method: "DELETE",
      },
    ],
    request: {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      params: req.params,
    },
  };
};

export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const workout = await db.getWorkout(id);
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json(workoutResponse(workout, req));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  const { date } = req.body;
  const userId = req.user!.id;
  if (!date) return res.status(400).json({ error: "date is required" });
  try {
    const workout = await db.createWorkout({ userId, date });
    res.json(workoutResponse(workout, req));
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
    const workout = await db.updateWorkout({ date, id });
    res.json(workoutResponse(workout, req));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await db.deleteWorkout(id);
    res.json(workoutResponse(workout, req));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkouts = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const workouts = await db.listWorkouts(userId);
    const response = workouts.map((workout: any) =>
      workoutResponse(workout, req)
    );
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
