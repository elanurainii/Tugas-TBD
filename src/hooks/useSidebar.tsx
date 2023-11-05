// https://github.com/MdUsmanAnsari/collapsible-sidebar-in-nextjs/blob/main/src/context/SidebarContext.js

import React, { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebarcollapse: () => void;
}

const initialValue: SidebarContextType = {
  isCollapsed: false,
  toggleSidebarcollapse: () => {},
};

const useSidebarContext = createContext<SidebarContextType>(initialValue);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <useSidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </useSidebarContext.Provider>
  );
};

export { useSidebarContext, SidebarProvider };
