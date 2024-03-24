import React, { useState } from 'react';
import Header from './Header'; // Asumiendo que tienes un componente de encabezado

function ProfileScreen() {
  // Suponiendo que ya has obtenido los datos del usuario de alguna manera
  const [user, setUser] = useState({
    name: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    type: 'estudiante' // O 'profesor', según corresponda
  });

  // Función para manejar la actualización del perfil, como cambiar la contraseña, etc.
  const handleUpdateProfile = () => {
    // Aquí se implementaría la lógica para actualizar el perfil
  };

  return (
    <div className="bg-[#F4EFF3] min-h-screen">
      <Header pageTitle="Perfil de Usuario" />
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Información del Perfil</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <input type="text" value={user.name} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
            <input type="text" value={user.lastName} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
            <input type="text" value={user.email} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Usuario:</label>
            <input type="text" value={user.type} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          {/* Implementar funcionalidades adicionales como cambio de contraseña, etc. */}
          <button onClick={handleUpdateProfile} className="bg-neutro-primary text-white px-6 py-2 rounded-md mt-4">
            Actualizar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
