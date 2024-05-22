import { createContext, useState } from "react";

export const SectionContext = createContext(null);

export const SectionProvider = ({ children }) => {
    const [section, setSection] = useState(JSON.parse(sessionStorage.getItem("section")) || null);

    const updateSection = (data) => {
        sessionStorage.setItem("section", JSON.stringify(data))
        setSection(data)
    }

    const context = {
        section,
        updateSection,
    }

    return (
        <SectionContext.Provider value={context}>
            {children}
        </SectionContext.Provider>
    )
}