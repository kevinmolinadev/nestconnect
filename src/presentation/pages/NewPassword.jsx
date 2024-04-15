import React, { useState } from 'react';
import Home from "../assets/home.jpg";

function NewPassword({ onResetComplete }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/reset-password', {
                credentials: "include",
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                // Llamar a una función de callback para redireccionar al inicio
                onResetComplete();
            } else {
                setError('No se pudo restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setError('Error al restablecer la contraseña.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px', margin: 'auto' }}>
                <form className="space-y-6" onSubmit={handleResetPassword}>
                    <h2 className="text-gray-900 text-3xl text-center mb-6">Coloque su nueva Contraseña</h2>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-900 mb-2">Nueva Contraseña</label>
                        <input type="password" id="password" className="p-3 rounded bg-gray-200 w-full" placeholder="Colocar Nueva Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-gray-900 mb-2">Confirme su contraseña</label>
                        <input type="password" id="confirmPassword" className="p-3 rounded bg-gray-200 w-full" placeholder="Confirme su nueva Contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="mt-4 bg-[#522B46] hover:bg-[#522B46] text-white   py-2 px-4 rounded transition ease-in-out duration-300">
                            Restablecer Contraseña
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default NewPassword;
