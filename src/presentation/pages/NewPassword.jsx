import React from 'react';
import Home from "../assets/home.jpg";

function NewPassword() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px', margin: 'auto' }}>
        <form className="space-y-6">
            <h2 className="text-gray-900 text-3xl text-center mb-6">Coloque su nueva Contraseña</h2>
            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-900 mb-2">Nueva Contraseña</label>
                <input type="password" id="password" className="p-3 rounded bg-gray-200 w-full" placeholder="Colocar Nueva Contraseña" required />
            </div>
            <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-gray-900 mb-2">Confirme su contraseña</label>
                <input type="password" id="confirmPassword" className="p-3 rounded bg-gray-200 w-full" placeholder="Confirme su nueva Contraseña" required />
            </div>
            <div className="flex justify-center">
                <button className="mt-4 bg-[#522B46] hover:bg-[#522B46] text-white   py-2 px-4 rounded transition ease-in-out duration-300">
                    Restablecer Contraseña
                </button>
            </div>
        </form>
    </div>
</div>

    );
}
export default NewPassword;