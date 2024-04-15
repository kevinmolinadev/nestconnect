import React from 'react';
import lostItemIcon from '../assets/home.jpg'; // Asegúrate de tener esta imagen en tus recursos
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa'; // Asegúrate de instalar react-icons
import Header from './Header';

function LostItemsScreen() {
  const lostItems = [
    { id: 1, foundLocation: 'Biblioteca', description: 'Reloj de pulsera negro', date: '15 de marzo de 2024' },
    { id: 2, foundLocation: 'Cafetería', description: 'Cuaderno de matemáticas', date: '22 de abril de 2024' },
    { id: 3, foundLocation: 'Cafetería', description: 'Cuaderno de matemáticas', date: '22 de abril de 2024' },
    // ...otros objetos perdidos
  ];

  if (lostItems.length === 0) {
    return (
      <div className="bg-neutro-tertiary min-h-screen p-4 flex justify-center items-center">
        <h2 className="text-2xl text-white">No hay objetos perdidos para mostrar.</h2>
      </div>
    );
  }

  return (
    <div className="bg-neutro-white min-h-screen p-4">
      <Header
        pageTitle="OBJETOS PERDIDOS"
        onHomeClick={() => setCurrentScreen('home')}
        onEventosClick={() => setCurrentScreen('eventos')}
        onAyudaClick={() => setCurrentScreen('ayuda')}
      />
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lostItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg shadow-lg bg-white transform transition duration-500 hover:scale-105">
              <img src={lostItemIcon} alt="Objeto perdido" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Encontrado en: {item.foundLocation}</h3>
                <p className="text-gray-700 text-base mb-4">{item.description}</p>
                <span className="text-sm block mb-4">{item.date}</span>
                <div className="flex justify-center gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center transition ease-in-out duration-300">
                    <FaCheck className="mr-2" /> ENCONTRADO
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center transition ease-in-out duration-300">
                    <FaSearch className="mr-2" /> PERDIDO
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center transition ease-in-out duration-300">
                    <FaTimes className="mr-2" /> RESEÑADO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LostItemsScreen;
