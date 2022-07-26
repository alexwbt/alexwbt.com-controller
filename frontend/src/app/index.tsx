import { useDockerController } from "../lib/hook/controller/docker";
import ContainerList from "./Container";

const App = () => {
  const dockerController = useDockerController();

  return (
    <div>
      <ContainerList containers={dockerController.containers} />
    </div>
  );
};

export default App;
