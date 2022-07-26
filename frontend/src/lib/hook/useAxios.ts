import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { getAxios } from "../util/axios";

type Method = "get" | "put" | "post" | "delete";

const useAxios = () => {

    const call = useCallback(async <
        ResponseData, RequestData = undefined
    >(
        method: Method, path: string, data?: RequestData
    ) => {
        const axios = await getAxios();
        const result = await axios.request<
            ResponseData,
            AxiosResponse<ResponseData, RequestData>,
            RequestData
        >({ method, url: path, data });
        return result;
    }, []);

    return { call };
};

export default useAxios;
