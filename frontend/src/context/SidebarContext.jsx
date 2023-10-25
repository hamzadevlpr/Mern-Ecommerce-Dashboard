import React, { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prod, setProd] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, setIsOpen, prod, setProd }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
