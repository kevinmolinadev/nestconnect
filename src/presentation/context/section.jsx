// section.jsx
import { createContext, useState, useEffect } from "react";

export const SectionContext = createContext(null);

export const SectionProvider = ({ children }) => {
  const [section, setSection] = useState(JSON.parse(sessionStorage.getItem("section")) || null);

  useEffect(() => {
    sessionStorage.setItem("section", JSON.stringify(section));
  }, [section]);

  const updateSection = (updatedSection) => {
    setSection(updatedSection);
  };

  const context = {
    section,
    updateSection,
  };

  return (
    <SectionContext.Provider value={context}>
      {children}
    </SectionContext.Provider>
  );
};