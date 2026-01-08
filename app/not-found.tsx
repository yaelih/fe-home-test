import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h4"
        color="secondary"
        fontWeight="bold"
        align="center"
      >
        Oops... There&apos;s nothing here.
      </Typography>
    </Box>
  );
}
