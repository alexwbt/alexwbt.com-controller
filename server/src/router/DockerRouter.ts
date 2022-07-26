import { Router as ExpressRouter } from "express";
import DockerManager from "../docker/DockerManager";
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

  public async list(): Promise<RouterHandlerReturnType<{
    name: string;
    image: string;
    publicPorts: number[];
  }[]>> {
    const containers = await this.dockerManager.listContainers();

    return {
      success: true,
      data: containers.map(info => ({
        name: info.Names[0] || info.Image,
        image: info.Image,
        publicPorts: Array.from(
          new Set(
            info.Ports
              .map(p => p.PublicPort)
              .filter(p => !isNaN(p))
          )
        )
      }))
    };
  }

}
