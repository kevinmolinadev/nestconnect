import React, { useState } from 'react';
import Home from "../assets/home.jpg";
import NewPassword from './NewPassword';
import PasswordVerifier from './PasswordVerifier';
import App from '../App';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [currentScreen, setCurrentScreen] = useState('home');

    const showNewPassword = () => {
        setCurrentScreen('NewPassword');
        // Aquí podrías enviar el código de restablecimiento a la API
        //AVANCE
        sendResetCode(email);
    };

    const showPasswordVerifier = () => {
        setCurrentScreen('PasswordVerifier');
        // Aquí podrías enviar el código de restablecimiento a la API
        sendResetCode(email);
    };

    const sendResetCode = async (email) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/send-reset-code', {
                credentials: "include",
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                // Continuar al siguiente paso si el código se envió correctamente
                setCurrentScreen('PasswordVerifier');
            } else {
                // Manejar errores, como mostrar un mensaje al usuario
                console.error('Error al enviar el código de restablecimiento');
            }
        } catch (error) {
            console.error('Error al enviar el código de restablecimiento:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    if (currentScreen === 'PasswordVerifier') {
        return <PasswordVerifier onSuccess={() => setCurrentScreen("NewPassword")} />;
    }

    if (currentScreen === "NewPassword") {
        return <NewPassword onResetComplete={() => setCurrentScreen("Home")} />
    }

    if (currentScreen === "Home") {
        return <App />
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-gray-900 text-3xl text-center mb-6">Recuperación de Contraseña</h2>
                    <p className="text-gray-900 text-opacity-75 mb-4 text-sm text-center">Introduce tu dirección de correo electrónico a continuación y te enviaremos un código de verificación para restablecer tu contraseña.</p>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-900 mb-2">Correo Electrónico</label>
                        <input type="email" id="email" className="p-3 rounded bg-gray-200 w-full" placeholder="Introduce tu correo electrónico" required value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="flex flex-col">
                        <button type="button" onClick={showPasswordVerifier} className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 mt-4">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
