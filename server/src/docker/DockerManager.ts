import * as Dockerode from "dockerode";
import { ContainerInfo } from "../type/docker";
import * as shelljs from "shelljs";

type Command = "build" | "run" | "stop" | "restart" | "list";

export default class DockerManager {

  constructor(
    private dockerode: Dockerode,
    private eScriptDir: string,
    private availableService: string[]
  ) { }

  public async listContainers(): Promise<ContainerInfo[]> {
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

  public runScript(command: Command, names: string[]) {
    return new Promise<number>(res => {
      const services = names.filter(
        n => this.availableService.includes(n)
      ).join(' ');

      if (!services)
        res(1);

      shelljs.exec(
        `cd ${this.eScriptDir} bash e ${command} ${services}`,
        res);
    });
  }

  public getAvailableServices() {
    return this.availableService;
  }

}
