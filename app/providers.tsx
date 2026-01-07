'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface CityContextType {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function useCity() {
  const context = useContext(CityContext);

  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>('');

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}
