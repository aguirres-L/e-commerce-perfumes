import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const SelectHeroContext = createContext();

// Proveedor del contexto
export const SelectHeroProvider = ({ children }) => {
  // Inicializar el estado con el valor de localStorage o un string vacío
  const [selectedHero, setSelectedHero] = useState(() => {
    return localStorage.getItem("selectedHero") || "";
  });

  const [isModalShop, setIsModalShop] = useState(null);

  // Actualizar localStorage cada vez que cambie el valor de selectedHero
  useEffect(() => {
    localStorage.setItem("selectedHero", selectedHero);
  }, [selectedHero]);

  return (
    <SelectHeroContext.Provider value={{ selectedHero, setSelectedHero , isModalShop, setIsModalShop}}>
      {children}
    </SelectHeroContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSelectHero = () => {
  const context = useContext(SelectHeroContext);
  if (!context) {
    throw new Error("useSelectHero debe usarse dentro de un SelectHeroProvider");
  }
  return context;
};