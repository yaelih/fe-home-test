'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';
import { useCity } from '../../providers';

export default function PageA() {
  const router = useRouter();
  const { city, setCity } = useCity();
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
    <>
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
    </>
  );
}
