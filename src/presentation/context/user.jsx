import { createContext, useState } from "react";
import { ErrorProvider } from "./error";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);

    const updateUser = (data) => {
        sessionStorage.setItem("user", JSON.stringify(data))
        setUser(data)
    }

    const context = {
        user,
        updateUser,
    }

    return (
        <UserContext.Provider value={context}>
            <ErrorProvider>
                {children}
            </ErrorProvider>
        </UserContext.Provider>
    )
}