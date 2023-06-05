import { Box, Link, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Asteroids
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Home &nbsp; | &nbsp; Terms and Conditions &nbsp; | &nbsp; Privacy Policy &nbsp; | &nbsp;
        Collection Statement &nbsp; | &nbsp; Help &nbsp; | &nbsp; Manage Account
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/alvaro93val">
          Álvaro Valverde
        </Link>{' '}
        {new Date().getFullYear()}
        {'. All Rights Reserved.'}
      </Typography>
    </Box>
  );
};

export default Footer;
