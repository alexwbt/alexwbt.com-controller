import { Request } from "express";
import DockerManager, { Command } from "../docker/DockerManager";
import { ContainerInfo } from "../type/docker";
import { Logger } from "../type/logger";
import { MapRouterReturnType, RouterHandlerReturnType } from "../type/router";
import Router from "./Router";

export default class DockerRouter extends Router {

  constructor(
    logger: Logger,
    private dockerManager: DockerManager
  ) {
    super(logger);
  }

  protected mapRouter(): MapRouterReturnType {
    return [
      ["/services", "get", this.services],
      ["/list", "get", this.list],
      ["/{command}/{service}", "get", this.run]
    ];
  }

  public async services(): Promise<RouterHandlerReturnType<string[]>> {
    return {
      success: true,
      data: this.dockerManager.getAvailableServices()
    };
  }

  public async list(): Promise<RouterHandlerReturnType<ContainerInfo[]>> {
    return {
      success: true,
      data: await this.dockerManager.listContainers()
    };
  }

  public async run(req: Request): Promise<RouterHandlerReturnType<number>> {
    switch (req.params["command"]) {
      case "build": case "run":
      case "stop": case "restart": break;
      default: return {
        success: false,
        error: {
          status: 400,
          message: "invalid command"
        }
      };
    }

    return {
      success: true,
      data: await this.dockerManager.runScript(
        req.params["command"], [req.params["name"]])
    };
  }

}
