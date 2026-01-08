import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h4"
        color="secondary"
        fontWeight="bold"
        align="center"
      >
        <CircularProgress /> Loading...
      </Typography>
    </Box>
  );
}
