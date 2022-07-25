import Dockerode = require("dockerode");
import { Application } from "express";
import DockerManager from "../docker/DockerManager";
import logger from "../util/logger";
import DockerRouter from "./DockerRouter";

const dockerode = new Dockerode();
const dockerManager = new DockerManager(dockerode);

const dockerRouter = new DockerRouter(logger, dockerManager);

export const useRouters = (app: Application) => {
  dockerRouter.useRouter(app, "/docker");
};
