import React, { createContext, useContext, useState } from 'react';
// State variable to keep track of whether dark mode is enabled
const ThemeContext = createContext();

// Function to toggle dark/light mode
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  // Toggle the state variable
  const toggleTheme = () => {
    setDarkMode(!darkMode);

    // Update the data-bs-theme attribute on the <html> element
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('data-bs-theme', darkMode ? 'light' : 'dark');
    }
  };

  // Expose the state and the toggle function to consumers of this context
  const value = {
    darkMode,
    toggleTheme,
  };

  // Provide the theme context to children
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
