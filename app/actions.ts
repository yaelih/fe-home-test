'use server';

import { cookies } from 'next/headers';
import { allInfo, countryDataType, weatherType } from './interfaces';

export async function getWeatherAndCountry({
  city,
  name,
}: {
  city: string;
  name: string;
}): Promise<allInfo | undefined> {
  try {
    const country = await getCountryCode(city);

    const weatherPromise = getWeather(`${city}, ${country}`);
    const countryPromise = getCountryInfo(country);

    const allResults = await Promise.all([weatherPromise, countryPromise]);
    const [weatherResponse, countryResponse] = allResults;

    const result: allInfo = {
      name,
      city,
      weather: weatherResponse as weatherType,
      countryData: countryResponse as countryDataType,
    };

    const cookieStore = await cookies();
    cookieStore.set('data', JSON.stringify(result), {
      httpOnly: false,
      maxAge: 60 * 10,
      path: '/',
    });

    return result;
  } catch (error) {
    console.error('Fetch getWeatherAndCountry error', error);
  }
}

async function getCountryCode(city: string) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const country = data[0].country;
    return country;
  } catch (error) {
    console.error('Fetch getCountryCode error:', error);
  }
}

async function getWeather(city: string): Promise<weatherType | undefined> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.weather[0];
  } catch (error) {
    console.error('Fetch getWeather error:', error);
  }
}

async function getCountryInfo(
  country: string
): Promise<countryDataType | undefined> {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${country}?fields=name,region,capital,currencies,languages,population,flags`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status ${res.status}`);
    }

    const data = await res.json();
    const selectedData: countryDataType = {
      name: data.name.common,
      region: data.region,
      currency: Object.keys(data.currencies)[0],
      capital: data.capital[0],
      languages: Object.values(data.languages),
      population: data.population,
      flagUrl: data.flags.png,
    };
    return selectedData;
  } catch (error) {
    console.error('fetch getCountryInfo error:', error);
  }
}
