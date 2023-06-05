import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
            404, Not Found!
          </Typography>
        </Container>
      </Box>
    </main>
  );
};

export default NotFound;
