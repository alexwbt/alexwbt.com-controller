import { useCallback, useEffect, useState } from "react";

const useAsyncData = <T>(
  initialData: T | (() => T),
  dataSource: () => Promise<T>
) => {
  const [data, setData] = useState<T>(initialData);

  const getData = useCallback(async () => {
    try {
      setData(await dataSource());
    } catch (error) {
      console.error(error);
    }
  }, [dataSource]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, getData] as const;
};

export default useAsyncData;
