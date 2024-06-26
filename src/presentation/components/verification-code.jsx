import { useState, useContext } from "react";
import Home from "../assets/home/home.jpg"
import { useMutation } from "@tanstack/react-query";
import { AuthService, UserService } from "../../infraestructure";
import ResetPassword from "./reset-password";
import { ErrorContext } from "../context/error";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

const VerificationCode = ({ type }) => {
    const [code, setCode] = useState("");
    const { updateError } = useContext(ErrorContext)
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const mutation = useMutation({ mutationFn: (code) => AuthService.validateCode({ code }), onSuccess: () => onSuccess(), onError: (e) => updateError(e.message) });

    const onSuccess = async () => {
        if (type === "validation") {
            await AuthService.validateEmail();
            const user = await UserService.getProfile();
            updateUser(user);
            navigate("/dashboard")
        }
    }

    if (mutation.isSuccess && type === "reset-password") return <ResetPassword />

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(code)
    };

    return (
        <div className="flex items-center max-sm:p-4 justify-center flex-grow bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
            <div className="bg-white p-6 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-2xl text-center mb-6">Codigo de Verificación</h2>

                    <p className="text-gray-900 text-opacity-75 mb-4  text-center">Introduce el código de verificación que se te fue enviado a tu correo electrónico.</p>

                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-gray-900 mb-2">Introduce tu Código</label>
                        <input
                            type="text"
                            id="code"
                            className="p-3 rounded bg-gray-200 w-full"
                            placeholder="Introduce el codigo de verificacion"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <button className="bg-neutro-tertiary text-white w-full p-3 rounded-md transition duration-300 mt-4">Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default VerificationCode;