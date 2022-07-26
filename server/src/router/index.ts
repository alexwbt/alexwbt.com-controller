import { Application } from "express";
import { dockerManager } from "../docker";
import logger from "../util/logger";
import DockerRouter from "./DockerRouter";

const dockerRouter = new DockerRouter(logger, dockerManager);

export const useRouters = (app: Application) => {
  dockerRouter.useRouter(app, "/docker");
};
