import { prisma } from "@/index";

export type CreateExercise = {
  workoutId: string;
  name: string;
};

export type UpdateExercise = {
  id: string;
  name: string;
};

export const getExercise = async (id: string) => {
  const exercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
    include: {
      sets: true,
    },
  });
  return exercise;
};

export const listExercises = async (workoutId: string) => {
  const exercises = await prisma.exercise.findMany({
    where: {
      workoutId,
    },
    include: {
      sets: true,
    },
  });
  return exercises;
};

export const createExercise = async ({ workoutId, name }: CreateExercise) => {
  const exercise = await prisma.exercise.create({
    data: {
      name,
      workout: {
        connect: {
          id: workoutId,
        },
      },
    },
  });
  return exercise;
};

export const updateExercise = async ({ id, name }: UpdateExercise) => {
  const exercise = await prisma.exercise.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return exercise;
};

export const deleteExercise = async (id: string) => {
  const exercise = await prisma.exercise.delete({
    where: {
      id,
    },
    include: {
      sets: true,
    },
  });
  return exercise;
};
