import { Box, Container } from '@mui/material';
import React from 'react';

const Page = ({ children }) => {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="sm">{children}</Container>
      </Box>
    </main>
  );
};

export default Page;
