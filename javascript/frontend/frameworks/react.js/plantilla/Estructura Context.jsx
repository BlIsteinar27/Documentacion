import { createContext } from "react";

// 1. Crear el contexto
export const UserContext = createContext();

// 2. Crear el provider (quien va a envolver la app)
export const UserProvider = ({ children }) => {
  // Aquí más adelante meteremos el estado (users, setUsers, etc.)
  const value = {}; // 👈 lo que compartimos con los hijos

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
