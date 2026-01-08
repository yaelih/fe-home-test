import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from '@mui/material';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { allInfo } from '../interfaces';

export default async function Result() {
  const cookieStore = await cookies();
  const cookieData = cookieStore.get('data');

  let data: allInfo | null = null;
  if (cookieData && cookieData.value) {
    data = JSON.parse(cookieData.value);
  }

  if (!data) {
    return (
      <Stack direction="row" justifyContent="center">
        <Typography variant="h5">
          Something went wrong. Please <Link href="/page-a">start again</Link>
        </Typography>
      </Stack>
    );
  }

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          m: '20px auto',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            Result Page
          </Typography>

          <List dense>
            {(['name', 'city'] as const).map((key) => (
              <ListItem key={key} disableGutters>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        component="span"
                        paddingInlineEnd={1}
                      >
                        {capitalize(key)}:
                      </Typography>
                      <Typography variant="body2" component="span">
                        {data[key]}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          {data.weather && (
            <>
              <Typography
                variant="subtitle1"
                color="primary"
                fontWeight="bold"
                gutterBottom
              >
                Weather
              </Typography>
              <Stack direction="row">
                <Stack flexGrow={1} justifyContent="center">
                  <Typography variant="h6">{data.weather?.main}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {capitalize(data.weather?.description)}
                  </Typography>
                </Stack>

                <Image
                  src={`https://openweathermap.org/img/wn/${data.weather?.icon}@2x.png`}
                  width={56}
                  height={56}
                  alt="weather icon"
                />
              </Stack>

              <Divider sx={{ my: 2 }} />
            </>
          )}

          {data.countryData && (
            <>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                Country Details
              </Typography>
              <List dense>
                {Object.entries(data.countryData).map(([key, value]) => (
                  <ListItem key={key} disableGutters>
                    {key === 'flagUrl' ? (
                      <Image
                        src={value as string}
                        alt="flag"
                        width={100}
                        height={73}
                      />
                    ) : (
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              component="span"
                              paddingInlineEnd={1}
                            >
                              {capitalize(key)}:
                            </Typography>
                            <Typography variant="body2" component="span">
                              {Array.isArray(value)
                                ? value.join(', ')
                                : value.toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
