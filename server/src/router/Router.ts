import { Application, RequestHandler, Router as ExpressRouter } from "express";
import * as pathUtil from "path";
import { Logger } from "../type/logger";
import { MapRouterReturnType, RouterHandler } from "../type/router";

export default abstract class Router {

  private router: ExpressRouter;

  private basePath: string = "";

  protected abstract mapRouter(router: ExpressRouter): MapRouterReturnType;

  constructor(private logger: Logger) {
    this.router = ExpressRouter();

    const map = this.mapRouter(this.router);
    for (const [path, method, handler] of map) {
      this.router[method](path, this.wrapHandler(path, handler.bind(this)));
    }
  }

  public useRouter(app: Application, path: string) {
    this.basePath = path;
    app.use(path, this.router);
  }

  private wrapHandler(path: string, handler: RouterHandler<unknown>): RequestHandler {
    return async (req, res, _next) => {
      try {

        const result = await handler(req, res);

        if (result.success == false) {
          this.logError(path, `${result.error.status} ${result.error.message}`);
          return res.status(result.error.status).json({
            message: result.error.message
          });
        }

        return res.status(200).json(result.data);

      } catch (error) {
        this.logError(path, error);
      }
    };
  }

  private logError(path: string, message: string) {
    this.logger.error(`[${pathUtil.join(this.basePath, path)}] ${message}`);
  }

}
