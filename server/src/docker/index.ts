import Dockerode = require("dockerode");
import * as fs from "fs";
import * as path from "path";
import DockerManager from "../docker/DockerManager";
import { getEnvStringRequired } from "../util/env";
import logger from "../util/logger";

const E_SCRIPT_DIR = getEnvStringRequired("E_SCRIPT_DIR");
const COMPOSE_DIR_NAME = getEnvStringRequired("COMPOSE_DIR_NAME");

const files = fs.readdirSync(path.join(E_SCRIPT_DIR, COMPOSE_DIR_NAME));
const services = files
  .filter(n => n.endsWith(".yml"))
  .map(n => n.replace(".yml", ""))
  .filter(n => n !== "controller");

logger.info(`Searched compose file, found available services: ${services.join(", ")}`);

const dockerode = new Dockerode();
export const dockerManager = new DockerManager(
  dockerode, E_SCRIPT_DIR, services
);
