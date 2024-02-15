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

export const DataProvider = ({ children }: DataProviderProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Helper function to capitalize the first letter of each word
  const capitalizeNames = <T extends { name: string }>(items: T[]): T[] => {
    return items.map((item) => ({
      ...item,
      name: item.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));
  };

  const fetchGenresAndInstruments = async () => {
    try {
      const genresResponse = await http.get("/genres");
      const instrumentsResponse = await http.get("/instruments");

      // Capitalize the names before setting them
      // Apply capitalization while preserving full object structure
      const capitalizedGenres = capitalizeNames<Genre>(genresResponse.data);
      const capitalizedInstruments = capitalizeNames<Instrument>(
        instrumentsResponse.data
      );

      setGenres(capitalizedGenres);
      setInstruments(capitalizedInstruments);
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
