import * as cors from "cors";
import * as express from "express";
import { useRouters } from "./router";
import { getEnvNumber, getEnvString } from "./util/env";
import logger from "./util/logger";
import { keycloakPassport } from "./util/passport";

(async () => {

  const PORT = getEnvNumber("PORT", 8080);
  const NODE_ENV = getEnvString("NODE_ENV", "development");

  const app = express();

  app.use(cors());

  app.use(keycloakPassport());

  useRouters(app)

  await new Promise<void>(resolve => app.listen(PORT, resolve));

  logger.info(`(${NODE_ENV}) Server running on port ${PORT}`);

})().catch(logger.error);
