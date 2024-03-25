import React, { useState } from 'react';
import Home from "../assets/home.jpg";
 
function CodeVerifier() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/validate-email', {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || 'Error al validar el código');
            }
 
            setSuccess(true);
        } catch (error) {
            console.error('Error al validar el código', error);
            setError(`Error al validar el código: ${error.toString()}`);
        }
    };
 
    if (success) {
        return <div className="bg-green-100 p-4 rounded-md text-green-700">Registro exitoso!</div>;
    }
 
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-3xl text-center mb-6">Codigo de Verificación</h2>
                   
                    <p className="text-gray-900 text-opacity-75 mb-4 text-sm text-center">Introduce el código de verificación que se te fue enviado a tu correo electrónico.</p>
                   
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
                    <div className="flex flex-col">
                        <button type="submit" className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 mt-4">Enviar</button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}
export default CodeVerifier;