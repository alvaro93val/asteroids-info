import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

const BackdropProgress = (props) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
      onClick={props.handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropProgress;
