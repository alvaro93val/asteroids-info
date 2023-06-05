import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const LateralMenu = (props) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={'Asteroids List'} disablePadding>
          <ListItemButton href="/asteroids">
            <ListItemIcon>
              <RocketLaunchIcon />
            </ListItemIcon>
            <ListItemText primary={'Asteroids List'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Favorite Asteroids'} disablePadding>
          <ListItemButton href="/favorites">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={'Favorite Asteroids'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default LateralMenu;
