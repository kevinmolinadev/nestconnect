import React from 'react';
import Header from './Header';
import { ChatIcon, QuestionMarkCircleIcon, CalendarIcon } from '@heroicons/react/outline'; // Asegúrate de tener estos iconos

function HomeScreen() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen flex flex-col items-center">
      <Header pageTitle="Inicio - AVU" />
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-xl shadow-xl p-8 mt-10 text-center transform transition duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido a AVU</h1>
          <p className="text-lg text-gray-600 mb-4">Tu asistente virtual para la gestión universitaria.</p>
          <p className="mb-8 text-gray-600">Explora los servicios que ofrecemos y gestiona tu vida académica de manera eficiente.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <button className="flex items-center justify-center bg-[#522B46] hover:bg-[#3e1f35] text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300">
              <ChatIcon className="h-6 w-6 mr-2" />
              Chatbot
            </button>
            <button className="flex items-center justify-center bg-[#522B46] hover:bg-[#3e1f35] text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300">
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
              FAQ
            </button>
            <button className="flex items-center justify-center bg-[#522B46] hover:bg-[#3e1f35] text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300">
              <CalendarIcon className="h-6 w-6 mr-2" />
              Eventos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
