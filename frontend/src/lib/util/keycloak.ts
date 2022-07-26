import jwt_decode from "jwt-decode";
import Keycloak from "keycloak-js";
import { TokenPayload } from "../type/keycloak";
import { getEnvStringRequired } from "./env";

const keycloak = new Keycloak({
    url: getEnvStringRequired("KEYCLOAK_AUTH_URL"),
    realm: getEnvStringRequired("KEYCLOAK_REALM"),
    clientId: getEnvStringRequired("KEYCLOAK_CLIENT_ID")
});

keycloak.init({
    checkLoginIframe: false,
    onLoad: "login-required",
    redirectUri: getEnvStringRequired("KEYCLOAK_REDIRECT_URI")
});

/* events */

let token: string = "";
let tokenPayload: TokenPayload | null = null;

type TokenListener = (data: {
    token: string;
    tokenPayload: TokenPayload | null
}) => void;

const listeners: TokenListener[] = [];

const triggerListeners = () => {
    if (keycloak.token === token)
        return;

    token = keycloak.token || "";

    try {
        tokenPayload = jwt_decode<TokenPayload>(token);
    } catch (error) {
        console.error("Failed to decode jwt.");
        console.error(error);
        tokenPayload = null;
    }

    listeners.forEach(listener => listener({
        token, tokenPayload
    }));
};

keycloak.onReady = triggerListeners;
keycloak.onAuthSuccess = triggerListeners;
keycloak.onAuthError = triggerListeners;
keycloak.onAuthRefreshSuccess = triggerListeners;
keycloak.onAuthRefreshError = triggerListeners;
keycloak.onAuthLogout = triggerListeners;
keycloak.onTokenExpired = triggerListeners;

export const addTokenListener = (callback: TokenListener) => {
    listeners.push(callback);
};

export const removeTokenListener = (callback: TokenListener) => {
    listeners.splice(listeners.indexOf(callback), 1);
};

/* token */

export const getToken = () => token;
export const getTokenPayload = () => tokenPayload;

/* actions */

export const logout = () => keycloak.logout();
export const refresh = () => keycloak.updateToken(30);
