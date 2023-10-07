import React, { createContext, useContext, useState } from 'react';

const PersonaContext = createContext();

export const usePersona = () => {
  return useContext(PersonaContext);
};

export const PersonaProvider = ({ children }) => {
  const [currentPersona, setCurrentPersona] = useState('Lisa');

  const setPersona = (persona) => {
    setCurrentPersona(persona);
  };

  const value = {
    currentPersona,
    setPersona,
  };

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
};
