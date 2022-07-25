import { Application, Router as ExpressRouter } from "express";

export default abstract class Router {

    private router: ExpressRouter;

    constructor() {
        this.router = ExpressRouter();
        this.initRouter(this.router);
    }

    protected abstract initRouter(router: ExpressRouter): void;

    public useRouter(app: Application, path: string) {
        app.use(path, this.router);
    }

}
