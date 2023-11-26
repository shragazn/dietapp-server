import { prisma } from "../..";

export type UpdateWorkout = {
  id: string;
  date: Date;
};

export const getWorkout = async (id: string) => {
  const workout = await prisma.workout.findUnique({
    where: {
      id,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  return workout;
};

export const listWorkouts = async (userId: string) => {
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  return workouts;
};

export const createWorkout = async ({
  userId,
  date,
}: {
  userId: string;
  date: Date;
}) => {
  const workout = await prisma.workout.create({
    data: {
      date: new Date(date),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return workout;
};

export const updateWorkout = async ({ id, date }: UpdateWorkout) => {
  const workout = await prisma.workout.update({
    where: {
      id,
    },
    data: {
      date: new Date(date),
    },
  });
  return workout;
};

export const deleteWorkout = async (id: string) => {
  const workout = await prisma.workout.delete({
    where: {
      id,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  return workout;
};
