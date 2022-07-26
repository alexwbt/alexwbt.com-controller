import { useCallback } from "react";
import { Container } from "../../type/api/docker";
import useAsyncData from "../useAsyncData";
import useAxios from "../useAxios";

export const useDockerController = () => {
  const { call } = useAxios();

  const [containers, refreshContainers] = useAsyncData([],
    useCallback(async () => {
      const result = await call<Container[]>("get", "/docker/list");
      return result.data;
    }, [call])
  );

  return {
    containers,
    refreshContainers,
  };
};
