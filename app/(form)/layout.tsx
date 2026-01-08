import { Stack } from '@mui/material';
import { CityProvider } from '../providers';
import Heading from '../_components/heading';

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CityProvider>
      <Stack spacing={2} width="100%" maxWidth={400}>
        <Heading title="Multi-Page Form" />
        {children}
      </Stack>
    </CityProvider>
  );
}
