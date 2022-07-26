import { Container } from "@mui/material";
import { useDockerController } from "../lib/hook/controller/docker";
import ContainerList from "./Container";

const App = () => {
  const dockerController = useDockerController();

  return (
    <Container disableGutters>
      <ContainerList containers={dockerController.containers} />
    </Container>
  );
};

export default App;
