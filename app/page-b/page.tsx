'use client';

import { useRouter } from 'next/navigation';
import { Button, Stack, TextField } from '@mui/material';
import { useCity } from '../providers';

export default function PageB() {
  const router = useRouter();
  const { city } = useCity();

  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username');
    // TODO: getWheaterAndCountry({city, username});
    router.push('/result');
  };

  return (
    <form action={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField
          id="city"
          label="city"
          variant="filled"
          value={city}
          disabled
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          id="username"
          name="username"
          label="User Name"
          variant="outlined"
          required
        />

        <Button type="submit" variant="contained" size="medium">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
