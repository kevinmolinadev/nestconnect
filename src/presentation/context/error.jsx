import { createContext, useEffect, useState } from "react";
import Alert from "../components/alert";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const updateError = (message) => {
        setError(message)
    };

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                clearError()
            }, 3000);
        }
    }, [error])

    const clearError = () => setError(null);
    return (
        <ErrorContext.Provider value={{ error, updateError, clearError }}>
            {children}
            {error && <Alert description={error} />}
        </ErrorContext.Provider>
    )
}