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
      ["/:command/:service", "get", this.run]
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
    const { command, service } = req.params;

    switch (command) {
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

    if (
      !this.dockerManager
        .getAvailableServices()
        .includes(service)
    ) return {
      success: false,
      error: {
        status: 400,
        message: "unknown service"
      }
    };

    return {
      success: true,
      data: await this.dockerManager
        .runScript(command, [service])
    };
  }

}
