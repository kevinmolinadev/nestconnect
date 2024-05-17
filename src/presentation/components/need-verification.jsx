import { useContext, useEffect } from "react";
import Home from "../assets/home/home.jpg"
import VerificationCode from "./verification-code";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../infraestructure";
import { ErrorContext } from "../context/error";

export const NeedVerfication = ({ email }) => {
    const { updateError } = useContext(ErrorContext);
    const sendData = useMutation({ mutationFn: (email) => AuthService.sendVerificationCode({ email }) })

    useEffect(() => {
        if (sendData.isError) updateError(sendData.error.message)
    }, [sendData.isError])

    if (sendData.isSuccess) return <VerificationCode type="validation" />

    const handleVerifyEmail = async () => {
        sendData.mutate(email)
    }

    return (
        <div className="flex items-center justify-center relative flex-grow bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-[400px] lg:text-lg">
                <h2 className="lg:text-2xl font-normal">¡Ups!</h2>
                <p className="my-4">Tu cuenta aún no está verificada. Por favor verifica tu correo electrónico.</p>
                <button className="bg-neutro-tertiary text-white w-full p-3 rounded-md transition duration-300 mt-4" onClick={handleVerifyEmail}>Verificar</button>
            </div>
        </div >
    );
}