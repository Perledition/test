/* eslint-disable */
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Inbox } from '@mui/icons-material';

import './ListGroup.css';

interface Props {
    items: string[];
    onSelectItem: (item: string) => void;
}

export default function SelectedListItem({items, onSelectItem}: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };



  return (
    <div className="list-root">
      <List className={"listItem"} component="nav" aria-label="main-menu-list">
        {items.length === 0 && <p>Kein Bereich verfügbar</p>}
        {items.map((item, index) => (
            <ListItem
            
            button
            selected={selectedIndex === index}
            onClick={(event) => {
                handleListItemClick(event, index);
                onSelectItem(item);
            }}
        >
            <ListItemIcon>
            <Inbox />
            </ListItemIcon>
            <ListItemText primary={item} />
        </ListItem>
        ))}
      </List>
    </div>
  );
}
