import React, { useState } from 'react';
import Home from "../assets/home.jpg";

function PasswordVerifier({ onVerifySuccess }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/verify-code', {
                credentials: "include",
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }) // Asegúrate de que el nombre del parámetro coincida con lo que espera el servidor
            });

            if (response.ok) {
                onVerifySuccess(); // Si tienes una función para manejar el éxito de la verificación, llámala aquí
            } else {
                const data = await response.json();
                setError(data.message || 'Error al verificar el código.');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            setError('Error al verificar el código.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-3xl text-center mb-6">Código de Verificación</h2>
                    <p className="text-gray-900 text-opacity-75 mb-4 text-center">Introduce el código de verificación que se te fue enviado a tu correo electrónico.</p>
                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-gray-900 mb-2">Código de Verificación</label>
                        <input
                            type="text"
                            id="code"
                            className="p-3 rounded bg-gray-200 w-full"
                            placeholder="Introduce el código de verificación"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <button type="submit" className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] text-white transition duration-300 mt-4">Verificar</button>
                    </div>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default PasswordVerifier;
