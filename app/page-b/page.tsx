'use client';

import { useRouter } from 'next/navigation';
import { Button, Stack, TextField } from '@mui/material';
import { getWeatherAndCountry } from '../actions';
import { useCity } from '../providers';

export default function PageB() {
  const router = useRouter();
  const { city } = useCity();

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;
    try {
      await getWeatherAndCountry({ city, name: username });
      router.push('/result');
    } catch (error) {
      console.log('error', error); //TODO: handle failure
    }
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
