export interface weatherType {
  id: string;
  main: string;
  description: string;
  icon: string;
}

export interface countryDataType {
  name: string;
  region: string;
  currency: string;
  capital: string;
  languages: string[];
  population: number;
  flagUrl: string;
}

export interface allInfo {
  name: string;
  city: string;
  weather: weatherType;
  countryData: countryDataType;
}
