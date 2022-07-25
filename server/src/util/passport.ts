import * as passport from "passport";
import { VerifiedCallback } from "passport-jwt";
import * as KeycloakBearerStrategy from "passport-keycloak-bearer";
import KeycloakToken from "../type/keycloak_token";
import { getEnvStringRequired } from "./env";

passport.use(new KeycloakBearerStrategy({
  realm: getEnvStringRequired("KEYCLOAK_REALM"),
  url: getEnvStringRequired("KEYCLOAK_URL")
}, (jwtPayload: KeycloakToken, done: VerifiedCallback) => {

  if (jwtPayload.resource_access
    ?.["docker-manager-frontend"]
    ?.roles?.includes('docker_manager_admin'))

    return done(null, jwtPayload);
  else
    return done(null, false);
}));

export const keycloakPassport = () =>
  passport.authenticate('keycloak', { session: false });
