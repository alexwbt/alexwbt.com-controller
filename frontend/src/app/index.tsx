import { useEffect } from "react";
import { getAxios } from "../util/axios";
import useKeycloakToken from "../util/hook/useKeycloakToken";

const App = () => {
  const [token, tokenPayload] = useKeycloakToken();

  useEffect(() => {
    (async () => {
      const axios = await getAxios();
      const result = await axios.get('/docker/list');
      console.log(result)
    })();
  }, [token]);

  return (
    <div>
      <div>{token}</div>
      <textarea value={JSON.stringify(tokenPayload, null, 4)} onChange={() => {}}></textarea>
    </div>
  );
};

export default App;
