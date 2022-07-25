
export const ENV_KEYS = [
    "API_BASE_URL",

    "KEYCLOAK_AUTH_URL",
    "KEYCLOAK_REALM",
    "KEYCLOAK_CLIENT_ID",
    "KEYCLOAK_REDIRECT_URI",
] as const;

type EnvKeys = typeof ENV_KEYS;
type EnvKey = EnvKeys[number];

export const getEnv = (key: EnvKey): string | undefined =>
    process.env["REACT_APP_" + key];

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
