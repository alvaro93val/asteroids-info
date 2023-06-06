// @ts-nocheck
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import LoaderContext from 'context/Loader';
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import BackdropProgress from './BackdropProgress';
import LateralMenu from './LateralMenu';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { showLoader, setShowLoader } = useContext(LoaderContext);

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
            onClick={() => setOpenDrawer(true)}
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
      <LateralMenu open={openDrawer} handleClose={() => setOpenDrawer(false)} />
      <BackdropProgress open={showLoader} handleClose={() => setShowLoader(false)} />
      <Outlet />
    </div>
  );
};

export default Header;
