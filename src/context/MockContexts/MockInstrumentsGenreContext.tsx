import { DataContext } from "../../context/InstrumentGenreContext";
// import React, { createContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface Instrument {
  id: number;
  name: string;
}

interface DataContextProps {
  genres: Genre[];
  instruments: Instrument[];
  error: string | null;
}

interface DataProviderProps {
  children: React.ReactNode;
}

// Mock values
const mockGenres = [{ id: 1, name: "Ambient" }];

const mockInstruments = [{ id: 1, name: "Guitar" }];

// Create a mock context provider
const MockDataContextProvider = ({ children }: DataProviderProps) => (
  <DataContext.Provider
    value={{ genres: mockGenres, instruments: mockInstruments, error: null }}
  >
    {children}
  </DataContext.Provider>
);

export { MockDataContextProvider };
