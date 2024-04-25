import { FastifyInstance } from "../types/fastify";
import projectController from "../controllers/projectController";
import { authorize } from "../middlewares/authorize";
import {
  projectPostOnresponseHander,
  projectPutOnResponeseHandler,
  projectsCustomMultipartConsumer,
} from "../services/projectHandler";

export function ProjectsRoute(
  instance: FastifyInstance,
  _option: any,
  done: () => void
) {
  instance.get(
    "/",
    { preValidation: [authorize("ANY")] },
    projectController.getProjects
  );
  instance.get(
    "/:projectId",
    { preValidation: [authorize("ANY")] },
    projectController.getProjectById
  );
  instance.post(
    "/",
    {
      preValidation: [authorize("ANY"), projectsCustomMultipartConsumer],
      onResponse: [projectPostOnresponseHander],
    },
    projectController.createProject
  );
  instance.put(
    "/",
    {
      preValidation: [authorize("ANY"), projectsCustomMultipartConsumer],
      onResponse: [projectPutOnResponeseHandler],
    },
    projectController.updateProject
  );
  instance.delete(
    "/:projectId",
    { preValidation: [authorize("ANY")] },
    projectController.deleteProject
  );
  instance.patch(
    "/likeToggle/:projectId",
    { preValidation: [authorize("ANY")] },
    projectController.projectLikeToggle
  );
  done();
}

