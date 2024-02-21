import React, { createContext, useContext, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  // Remove the theme prop if it's not needed
}

// Define the shape of your context data
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Provide a default value that matches the shape of ThemeContextType
const defaultValue: ThemeContextType = {
  isDarkMode: false, // Default mode
  toggleDarkMode: () => {}, // No-op function as placeholder
};

// Create a context
export const ThemeContext = createContext<ThemeContextType>(defaultValue);

// Provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newState = !isDarkMode;
    if (newState) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setIsDarkMode(newState);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for easy access to the context
export const useTheme = () => useContext(ThemeContext);
