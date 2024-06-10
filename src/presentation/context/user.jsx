import { createContext, useEffect, useState } from "react";
import { ErrorProvider } from "./error";
import { SectionProvider } from "./section";
import { UserService, AuthService } from "../../infraestructure";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
    const [credentials, setCredentials] = useState({ type: null });

    useEffect(() => {
        if (user) {
            loadType()
        }
    }, [])

    const updateUser = (data) => {
        const { type, ...basicData } = data;
        sessionStorage.setItem("user", JSON.stringify(basicData))
        setCredentials({ type });
        setUser(basicData)
    }

    const loadType = async () => {
        try {
            const { type } = await UserService.getProfile()
            setCredentials({ type });
        } catch (error) {
            sessionStorage.removeItem("user");
            window.location.href = '/';
        }

    }

    const closeSession = async () => {
        await AuthService.logOut();
        sessionStorage.removeItem("user");
        window.location.href = '/';
    }

    const context = {
        user,
        credentials,
        updateUser,
        closeSession
    }

    return (
        <UserContext.Provider value={context}>
            <ErrorProvider>
                <SectionProvider>
                    {children}
                </SectionProvider>
            </ErrorProvider>
        </UserContext.Provider>
    )
}