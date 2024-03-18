import { useState } from 'react';
import Home from "../assets/home.jpg";
import ForgotPassword from './ForgotPassword';

function RegistrarScreen() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    if (showForgotPassword) {
        return <ForgotPassword />;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow justify-center items-center">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${Home})` }}>
                    <div className="bg-white bg-opacity-0 p-8 rounded-lg shadow-2xl" 
                         style={{ 
                             maxWidth: '500px', 
                             margin: 'auto', 
                             marginTop: '20vh' 
                         }}>
                        <h1 className="text-4xl font-bold text-white mb-6 text-center">BIENVENIDO A A.V.U</h1>
                        <form>
                            <div className="mb-4">
                                <input type="email" placeholder="Correo Electrónico" className="p-2 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <input type="password" placeholder="Contraseña" className="p-2 rounded-md w-full" />
                            </div>
                            <a onClick={handleForgotPasswordClick} className="text-xl text-white cursor-pointer">
                                Olvidé mi contraseña
                            </a>
                            <button type="submit" className="bg-[#522B46] text-white rounded-md p-5 w-full mt-4 hover:bg-[#522B46] transition-colors duration-300">Regístrate</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegistrarScreen;
