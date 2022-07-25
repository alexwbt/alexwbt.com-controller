import axios from "axios";
import { getEnvStringRequired } from "./env";
import { addTokenListener, getToken, refresh } from "./keycloak";

const createAxiosInstance = () => axios.create({
    baseURL: getEnvStringRequired("API_BASE_URL"),
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

let axiosInstance = createAxiosInstance();

export const updateAxiosInstance = () => {
    axiosInstance = createAxiosInstance();
};

addTokenListener(updateAxiosInstance);

export const getAxios = async () => {
    try {
        const refreshed = await refresh();
        if (refreshed)
            updateAxiosInstance();
    } catch (error: any) {
        console.error(error);
    }
    return axiosInstance;
};
