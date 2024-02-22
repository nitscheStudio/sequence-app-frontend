import React, { createContext, useContext, useState, useEffect } from "react";

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
  // Initialize state with the theme preference from local storage or default to false

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true" ? true : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Update local storage and document class when isDarkMode changes
    localStorage.setItem("isDarkMode", isDarkMode.toString());
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for easy access to the context
export const useTheme = () => useContext(ThemeContext);
