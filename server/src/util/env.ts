import * as dotenv from "dotenv";
import * as path from "path";

export const ENV_KEYS = [
  "ENV_FILE",

  "NODE_ENV",
  "PORT",

  "LOGGER_TIMEZONE",

  "KEYCLOAK_URL",
  "KEYCLOAK_REALM",
] as const;

type EnvKeys = typeof ENV_KEYS;
type EnvKey = EnvKeys[number];

export const getEnv = (key: EnvKey): string | undefined =>
  process.env[key];

export const getEnvString = (key: EnvKey, defaultValue: string = ''): string =>
  getEnv(key) || defaultValue;

export const getEnvNumber = (key: EnvKey, defaultValue: number = 0): number =>
  Number(getEnv(key)) || defaultValue;

export const getEnvBoolean = (key: EnvKey, defaultValue: boolean = false): boolean => {
  const value = getEnv(key);
  if (typeof value === 'undefined')
    return defaultValue;
  return value === 'true';
};

export const getEnvStringRequired = (key: EnvKey): string => {
  const value = getEnv(key);
  if (typeof value === 'undefined')
    throw new Error(`Required variable ${key} is not provided.`);
  return value;
};

const envFile = path.join(`${__dirname}/../../env/${getEnvString("ENV_FILE")}.env`);
console.log(`Loading env file from "${envFile}"`);
dotenv.config({ path: envFile });

for (const key of ENV_KEYS) {
  console.log(`${key}: ${getEnv(key)}`);
}
