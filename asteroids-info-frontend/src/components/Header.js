// @ts-nocheck
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import LateralMenu from './LateralMenu';

const Header = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <div>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Button href="/">
            <Typography variant="h4" color="white" noWrap>
              Asteroids
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <LateralMenu open={openDrawer} handleClose={handleDrawerClose} />
      <Outlet />
    </div>
  );
};

export default Header;
