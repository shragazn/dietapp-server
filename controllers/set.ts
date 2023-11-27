import * as db from "@db/index";
import { Set as WorkoutSet } from "@prisma/client";
import { Request, Response } from "express";

const setResponse = <
  T extends WorkoutSet & { exercise: { workoutId: string } }
>(
  set: T,
  req: Request
) => {
  return {
    data: set,
    message: "Set found",
    actions: [
      {
        label: "View",
        url: `/set/${set.id}`,
        method: "GET",
      },
      {
        label: "Update",
        url: `/set/${set.id}`,
        method: "PUT",
      },
      {
        label: "Delete",
        url: `/set/${set.id}`,
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

export const listSets = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  if (!exerciseId)
    return res.status(400).json({ error: "exerciseId is required" });

  try {
    const sets = await db.listSets(exerciseId);
    if (!sets.length) return res.status(404).json({ error: "Sets not found" });

    const response = sets.map((set) => setResponse(set, req));
    res.json(response);
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const getSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const set = await db.getSet(id);
    if (!set) return res.status(404).json({ error: "Set not found" });

    res.json(setResponse(set, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const createSet = async (req: Request, res: Response) => {
  const { exerciseId, workoutId } = req.params;
  if (!exerciseId)
    return res.status(400).json({ error: "exerciseId is required" });
  const { reps, weight } = req.body;
  if (!reps) return res.status(400).json({ error: "reps is required" });
  if (!weight) return res.status(400).json({ error: "weight is required" });

  try {
    const set = await db.createSet({ exerciseId, reps, weight });
    res.json(setResponse({ ...set, exercise: { workoutId } }, req));
  } catch (error: any) {
    res.sendStatus(500);
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
    const response = {
      message: "Sets created",
      data: createdSets,
    };
    res.json(response);
  } catch (error: any) {
    res.sendStatus(500);
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
    res.json(setResponse(set, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};

export const deleteSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id is required" });

  try {
    const set = await db.deleteSet(id);
    res.json(setResponse(set, req));
  } catch (error: any) {
    res.sendStatus(500);
  }
};
