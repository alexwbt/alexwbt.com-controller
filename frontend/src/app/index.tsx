import { useDockerController } from "../lib/hook/controller/docker";

const App = () => {
  const dockerController = useDockerController();

  return (
    <div>
      <div>{ }</div>
      <textarea
        value={JSON.stringify(dockerController.containers, null, 4)}
        onChange={() => { }}
      ></textarea>
    </div>
  );
};

export default App;
