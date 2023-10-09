import React, { createContext, useContext, useState } from 'react';
// Create a context for Persona
const PersonaContext = createContext();

// Custom hook to use Persona context
export const usePersona = () => {
  return useContext(PersonaContext);
};

// Persona Provider Component
export const PersonaProvider = ({ children }) => {
  // State variable to keep track of the current persona
  const [currentPersona, setCurrentPersona] = useState('Lisa');

  // Function to set the current persona
  const setPersona = (persona) => {
    setCurrentPersona(persona);
  };

  // Expose the state and the setter function to consumers of this context
  const value = {
    currentPersona,
    setPersona,
  };

  // Provide the persona context to children
  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
};
