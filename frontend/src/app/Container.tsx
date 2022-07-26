import { List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { Container } from "../lib/type/api/docker";

const S = {
  Status: styled.div`
    padding: 0 5px;
    text-align: right;
  `,
} as const;

const ContainerList: React.FC<{
  containers: Container[];
  selected?: string | undefined;
  onClickItem?: (name: string) => void;
}> = ({ containers, selected, onClickItem }) => {
  const [_selected, setSelected] = useState<string>();

  return (
    <List>
      <ListSubheader>Running Containers</ListSubheader>
      {containers.map((c, i) => (
        <ListItemButton
          key={c.name + i}
          selected={(selected || _selected) === c.name}
          onClick={() => !!onClickItem
            ? onClickItem(c.name)
            : setSelected(c.name)}
        >
          <ListItemText primary={c.name.slice(1)} secondary={c.image} />
          <S.Status>
            <ListItemText secondary={c.status} />
          </S.Status>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ContainerList;
