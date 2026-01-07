'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Stack, TextField } from '@mui/material';

export default function PageA() {
  const router = useRouter();
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleNext = () => {
    const trimmedValue = city.trim();

    if (!trimmedValue) {
      setError(true);
      return;
    }

    setCity(trimmedValue);
    setError(false);
    router.push('/page-b');
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <TextField
        id="city"
        label="City"
        variant="outlined"
        required
        value={city}
        error={error}
        helperText={error ? 'Invalid value' : ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (error) setError(false);
          setCity(event.target.value);
        }}
      />

      <Button variant="contained" size="medium" onClick={handleNext}>
        Next
      </Button>
    </Stack>
  );
}
