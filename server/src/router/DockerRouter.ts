import { Router as ExpressRouter } from "express";
import DockerManager from "../docker/DockerManager";
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

  protected mapRouter(router: ExpressRouter): MapRouterReturnType {
    return [
      ["/list", "get", this.list]
    ];
  }

  public async list(): Promise<RouterHandlerReturnType<ContainerInfo[]>> {
    return {
      success: true,
      data: await this.dockerManager.listContainers()
    };
  }

}
