// const getProjects = async (req: FastifyRequest, res: FastifyReply) => {};

import { PrismaClient } from "@prisma/client";

export async function createProject(
  {
    title,
    context,
    tags,
    media,
    author_id,
  }: {
    author_id: string;
    title: string;
    context: string;
    tags: string[];
    media: {
      filename: string;
      caption?: string;
    }[];
  },
  prisma: PrismaClient
) {
  await prisma.project.create({
    data: {
      title,
      tags: tags || [],
      context,
      media: media || [],
      author: {
        connect: {
          id: author_id,
        },
      },
    },
  });
}

export async function getProjects(prisma: PrismaClient) {
  return await prisma.project.findMany({});
}

export async function getProjectById(id: string, prisma: PrismaClient) {
  return await prisma.project.findUnique({
    where: {
      id,
      projectStatus: "ACTIVE",
    },
  });
}

export async function deleteProject(id: string, prisma: PrismaClient) {
  return await prisma.project.update({
    where: {
      id,
    },
    data: {
      projectStatus: "ARCHIVED",
    },
  });
}

export async function updateProject(
  {
    projectId,
    title,
    context,
    tags,
    media,
  }: {
    projectId: string;
    title: string;
    context: string;
    tags: string[];
    media: {
      filename: string;
      caption?: string;
    }[];
  },
  prisma: PrismaClient
) {
  const oldProjectPost = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!oldProjectPost) throw new Error("Project not found");

  return await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      title: title || oldProjectPost.title,
      context: context || oldProjectPost.context,
      tags: tags || oldProjectPost.tags,
      media: media || oldProjectPost.media,
    },
  });
}

export async function projectLikeToggle(
  { userId, projectId }: { projectId: string; userId: string },
  prisma: PrismaClient
) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      liked_projects: {
        where: { id: projectId },
        select: {
          id: true,
        },
      },
    },
  });
  if (!data) throw new Error("User not found");
  if (data.liked_projects.length <= 0)
    await prisma.user.update({
      where: { id: userId },
      data: {
        liked_projects: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  else
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        liked_projects: {
          disconnect: {
            id: projectId,
          },
        },
      },
    });
}
