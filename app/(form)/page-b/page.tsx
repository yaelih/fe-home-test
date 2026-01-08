'use client';

import { useRouter } from 'next/navigation';
import {
  Alert,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { getWeatherAndCountry } from '../../actions';
import { useCity } from '../../providers';
import { useEffect, useState } from 'react';

export default function PageB() {
  const router = useRouter();
  const { city } = useCity();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!city) {
      router.push('/page-a');
    }
  }, [city, router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (formData: FormData) => {
    setError(false);
    const username = formData.get('username') as string;
    try {
      await getWeatherAndCountry({ city, name: username });
      router.push('/result');
    } catch {
      setError(true);
    }
  };

  return (
    <>
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

      {error && <Alert severity="error">Something went wrong. Try again</Alert>}
    </>
  );
}
