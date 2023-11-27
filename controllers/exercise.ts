import { Request, Response } from "express";
import * as db from "@db/index";
import { Exercise } from "@prisma/client";

const exerciseResponse = (exercise: Exercise, req: Request) => {
  return {
    data: exercise,
    message: "Exercise found",
    actions: [
      {
        label: "View",
        url: `exercise/${exercise.id}`,
        method: "GET",
      },
      {
        label: "Update",
        url: `exercise/${exercise.id}`,
        method: "PUT",
      },
      {
        label: "Delete",
        url: `exercise/${exercise.id}`,
        method: "DELETE",
      },
    ],
    request: {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  };
};

export const getExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const exercise = await db.getExercise(id);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });
    res.json(exerciseResponse(exercise, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const listExercisesByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const exercises = await db.listExercisesByName(name as string);
    if (!exercises.length)
      return res.status(404).json({ error: "Exercises not found" });
    const response = exercises.map((exercise) =>
      exerciseResponse(exercise, req)
    );
    res.json({ data: response });
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const listExercises = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  if (!workoutId)
    return res.status(400).json({ error: "workoutId is required" });

  try {
    const exercises = await db.listExercises(workoutId);
    if (!exercises.length)
      return res.status(404).json({ error: "Exercises not found" });
    const response = exercises.map((exercise) =>
      exerciseResponse(exercise, req)
    );
    res.json({ data: response });
  } catch (error: any) {
    res.sendStatus(500);
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
    res.json(exerciseResponse(exercise, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const exercise = await db.updateExercise({ id, name });
    res.json(exerciseResponse(exercise, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const exercise = await db.deleteExercise(id);
    res.json(exerciseResponse(exercise, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};
