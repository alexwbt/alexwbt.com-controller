import axios, { AxiosInstance } from "axios";
import { getEnvStringRequired } from "./env";
import { addTokenListener, refresh } from "./keycloak";

let axiosInstance: AxiosInstance | null = null;

let axiosListeners: (() => boolean)[] = [];

const tokenListener = ({ token }: { token: string }) => {
  axiosInstance = axios.create({
    baseURL: getEnvStringRequired("API_BASE_URL"),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  axiosListeners = axiosListeners.filter(c => !c());
};

const getAxiosPromise = () =>
  new Promise<AxiosInstance>((res) => {
    const update = () =>
      (!!axiosInstance && res(axiosInstance)) || true;
    axiosListeners.push(update);
  });

export const getAxios = async () => {
  await refresh().catch(() => { });
  return axiosInstance || await getAxiosPromise();
};

addTokenListener(tokenListener);
