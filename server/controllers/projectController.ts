import {
  createProject as createProjectFn,
  getProjectById as getProjectByIdFn,
  deleteProject as deleteProjectFn,
  updateProject as updateProjectFn,
  getProjects as getProjectsFn,
  projectLikeToggle as projectLikeToggleFn,
} from "../models/projectQuery";

import { FastifyReply, FastifyRequest } from "../types/fastify";
import { requestFieldChecker } from "../utils/reqTools";
import { moveFile } from "../utils/fileManager";

// const createProject = async ({tags: string })

const createProject = async (
  req: FastifyRequest<{
    Body: ProjectPostBody;
  }>,
  res: FastifyReply
) => {
  // Check if required fields are present
  const missingFields = requestFieldChecker(
    ["title", "context", "tags", "media"],
    req
  );

  if (missingFields.length > 0)
    return res
      .code(400)
      .send({ status: "error", message: "Missing required fields" });

  await createProjectFn(
    {
      author_id: req.userId,
      title: req.body.title,
      context: req.body.context,
      media: req.body.media,
      tags: req.body.tags,
    },
    req.prisma
  );

  // Move file to public folder
  req.body.media.forEach(async (elem) => {
    await moveFile([elem.filename], "tmp", "public");
  });
  return res.code(201).send({
    status: "success",
    message: "Project created",
  });
};

const getProjectById = async (
  req: FastifyRequest<{ Params: { projectId: string }; Body: any }>,
  res: FastifyReply
) => {
  if (!req.params.projectId)
    return res
      .code(400)
      .send({ status: "error", message: "Project id is required" });
  const project = await getProjectByIdFn(req.params.projectId, req.prisma);
  return res.code(200).send({ status: "success", data: project });
};

const getProjects = async (req: FastifyRequest, res: FastifyReply) => {
  const projects = await getProjectsFn(req.prisma);
  return res.code(200).send({ status: "success", data: projects });
};

const deleteProject = async (
  req: FastifyRequest<{ Params: { projectId?: string }; Body: any }>,
  res: FastifyReply
) => {
  if (!req.params.projectId)
    return res
      .code(404)
      .send({ status: "error", message: "Project id is required" });
  await deleteProjectFn(req.params.projectId, req.prisma);

  return res.code(200).send({ status: "success", message: "Project deleted" });
};

const updateProject = async (
  req: FastifyRequest<{
    Body: ProjectPutBody;
  }>,
  res: FastifyReply
) => {
  // Check if project exist

  const missingFields = requestFieldChecker(
    ["projectId", "title", "tags", "context", "media"],
    req
  );

  if (missingFields.length > 0)
    return res.code(400).send({
      status: "error",
      message: "Missing required fields",
      error: missingFields,
    });

  try {
    await updateProjectFn(
      {
        projectId: req.body.projectId,
        title: req.body.title,
        tags: req.body.tags || [],
        context: req.body.context,
        media: req.body.media,
      },
      req.prisma
    );
  } catch (error) {
    return res
      .code(500)
      .send({ status: "success", message: "Unexpected Error Occured", error });
  }

  req.body.media.forEach((elem) => {
    moveFile([elem.filename], "tmp", "public");
  });
  return res.code(200).send({ status: "success", message: "Project updated" });
};

const projectLikeToggle = async (
  req: FastifyRequest<{ Body: any; Params: { projectId: string } }>,
  res: FastifyReply
) => {
  try {
    await projectLikeToggleFn(
      { userId: req.userId, projectId: req.params.projectId },
      req.prisma
    );
  } catch (error) {
    console.log(error);
    return res.code(500).send({
      status: "fail",
      message: "Unexpected Error Occured",
      error: (error as Error).message,
    });
  }
  return res.code(200).send({ status: "success", message: "Project liked" });
};

const projectController = {
  createProject,
  getProjectById,
  getProjects,
  deleteProject,
  updateProject,
  projectLikeToggle,
};

export default projectController;

export type ProjectPostBody = {
  title: string;
  context: string;
  media: { filename: string; caption?: string }[];
  tags: string[];
};

export type ProjectPutBody = {
  projectId: string;
  title: string;
  tags: string[];
  context: string;
  media: { filename: string; caption?: string }[];
};
