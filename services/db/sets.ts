import { prisma } from "@/index";

export type CreateSet = {
  exerciseId: string;
  reps: number;
  weight: number;
  id?: string;
};

export type ListSetsByExercise = {
  exerciseName: string;
  userId: string;
};

export const listSets = async (exerciseId: string) => {
  const sets = await prisma.set.findMany({
    where: {
      exerciseId,
    },
    include: {
      exercise: {
        select: {
          name: true,
          workoutId: true,
        },
      },
    },
  });
  return sets;
};

export const getSet = async (id: string) => {
  const set = await prisma.set.findUnique({
    where: {
      id,
    },
    include: {
      exercise: {
        select: {
          name: true,
          workoutId: true,
        },
      },
    },
  });
  return set;
};

export const createSets = async ({
  exerciseId,
  sets,
}: {
  exerciseId: string;
  sets: Omit<CreateSet, "exerciseId">[];
}) => {
  const createdSets = await prisma.set.createMany({
    data: sets.map((set) => ({
      ...set,
      exerciseId,
    })),
  });
  return createdSets;
};

export const createSet = async ({ exerciseId, reps, weight }: CreateSet) => {
  const createdSet = await prisma.set.create({
    data: {
      reps,
      weight,
      exerciseId,
    },
  });
  return createdSet;
};

export const updateSet = async ({
  id,
  reps,
  weight,
}: Omit<CreateSet, "exerciseId">) => {
  const set = await prisma.set.update({
    where: {
      id,
    },
    data: {
      reps,
      weight,
    },
    include: {
      exercise: {
        select: {
          name: true,
          workoutId: true,
        },
      },
    },
  });
  return set;
};

export const deleteSet = async (id: string) => {
  const set = await prisma.set.delete({
    where: {
      id,
    },
    include: {
      exercise: {
        select: {
          name: true,
          workoutId: true,
        },
      },
    },
  });
  return set;
};
