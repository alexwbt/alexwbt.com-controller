import * as Dockerode from "dockerode";
import { ContainerInfo } from "../type/docker";

export default class DockerManager {

  constructor(
    private dockerode: Dockerode
  ) { }

  async listContainers(): Promise<ContainerInfo[]> {
    return (await this.dockerode.listContainers()).map(info => ({
      name: info.Names[0] || info.Image,
      image: info.Image,
      status: info.Status,
      publicPorts: Array.from(
        new Set(
          info.Ports
            .map(p => p.PublicPort)
            .filter(p => !isNaN(p))
        )
      )
    }));
  }

}
