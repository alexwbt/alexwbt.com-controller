import * as Dockerode from "dockerode";

export default class DockerManager {

    constructor(
        private dockerode: Dockerode
    ) { }

    listContainers() {
        return this.dockerode.listContainers();
    }

}
