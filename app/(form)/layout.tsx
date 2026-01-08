import { Stack, Typography } from '@mui/material';
import { CityProvider } from '../providers';

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CityProvider>
      <Stack spacing={2} width="100%" maxWidth={400}>
        <Typography
          variant="h5"
          gutterBottom
          color="primary"
          fontWeight="bold"
          align="center"
        >
          Multi-Page Form
        </Typography>
        {children}
      </Stack>
    </CityProvider>
  );
}
