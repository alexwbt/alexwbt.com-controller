import { RequestHandler, Router as ExpressRouter } from "express";
import DockerManager from "../docker/DockerManager";
import Router from "./Router";

export default class DockerRouter extends Router {

    constructor(private dockerManager: DockerManager) {
        super();
    }

    protected initRouter(router: ExpressRouter): void {
        router.get("/list", (req, res) => {
            res.status(200).json(this.dockerManager.listContainers());
        });
    }

}
