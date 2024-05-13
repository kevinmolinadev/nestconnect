import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
    const context = {
        user,
        setUser,
    }
    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}