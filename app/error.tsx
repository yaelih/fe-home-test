'use client';

import { Box, Typography } from '@mui/material';

export default function Error() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        variant="h4"
        color="secondary"
        fontWeight="bold"
        align="center"
      >
        Oh No!!! Error!!!
      </Typography>
    </Box>
  );
}
