import { Typography } from '@mui/material';

export default function Heading({ title }: { title: string }) {
  return (
    <Typography
      variant="h5"
      gutterBottom
      color="primary"
      fontWeight="bold"
      align="center"
    >
      {title}
    </Typography>
  );
}
