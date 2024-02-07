import React, { createContext, useEffect, useState } from "react";
import http from "../utils/http";

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

export const DataContext = createContext<DataContextProps>({
  genres: [],
  instruments: [],
  error: null,
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGenresAndInstruments = async () => {
    try {
      const genresResponse = await http.get("/genres");
      const instrumentsResponse = await http.get("/instruments");

      setGenres(genresResponse.data);
      setInstruments(instrumentsResponse.data);
      setError(null);
    } catch (error) {
      console.error("An error occurred while fetching the data.", error);
      setError("Unable to load resource. Please try again later.");
      setGenres([]);
      setInstruments([]);
    }
  };

  useEffect(() => {
    fetchGenresAndInstruments();
  }, []);

  return (
    <DataContext.Provider value={{ genres, instruments, error }}>
      {children}
    </DataContext.Provider>
  );
};
