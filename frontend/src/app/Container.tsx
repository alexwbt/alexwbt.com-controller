import { Button, List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { Container } from "../lib/type/api/docker";

const ContainerList: React.FC<{
  containers: Container[];
}> = ({ containers }) => {
  return (
    <List>
      <ListSubheader>Running Containers</ListSubheader>
      {containers.map((c, i) => (
        <ListItemButton disableTouchRipple key={c.name + i}>
          <ListItemText primary={c.name.slice(1)} secondary={c.image} />
          <div>
            <Button color="error">stop</Button>
          </div>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ContainerList;
