import React from 'react';
import Home from "./assets/home.jpg";

function ForgotPassword() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
                <form className="space-y-6">
                    <h2 className="text-gray-900 text-3xl text-center mb-6">Recuperación de Contraseña</h2>
                    
                    <p className="text-gray-900 text-opacity-75 mb-4 text-sm text-center">Introduce tu dirección de correo electrónico a continuación y te enviaremos un código de verificación para restablecer tu contraseña.</p>
                    
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-900 mb-2">Correo Electrónico</label>
                        <input type="email" id="email" className="p-3 rounded bg-gray-200 w-full" placeholder="Introduce tu correo electrónico" required />
                    </div>
                    <div className="flex flex-col">
                        <button type="submit" className="bg-[#5A5A64] text-white rounded-md p-3 w-full mt-4 hover:bg-[#522B46] transition-all duration-500 hover:scale-105">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
