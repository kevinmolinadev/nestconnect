import React from 'react';
import Header from './Header';
import { ChatIcon, QuestionMarkCircleIcon, CalendarIcon, AcademicCapIcon } from '@heroicons/react/outline'; // Asegúrate de tener estos iconos

function HomeScreen() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen flex flex-col items-center">
      {/* Modificación en el header para que ocupe todo el espacio horizontal */}
      <div className="w-full">
        <Header pageTitle="Inicio - AVU" fullHeader={true} />
      </div>

      <div className="container mx-auto p-8">
        <div className="bg-white rounded-xl shadow-xl p-8 mt-10 text-center transform transition duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido a AVU</h1>
          <p className="text-lg text-gray-600 mb-4">Tu asistente virtual para la gestión universitaria.</p>
          <p className="mb-8 text-gray-600">Explora los servicios que ofrecemos y gestiona tu vida académica de manera eficiente.</p>

          {/* Contenido añadido en los espacios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center mb-8">
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

          {/* Nuevo contenido y elementos visuales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-100 rounded-xl shadow-md">
              <AcademicCapIcon className="h-8 w-8 text-[#522B46] mb-2" />
              <h2 className="text-lg font-semibold text-[#522B46] mb-2">Recursos Académicos</h2>
              <p className="text-gray-700">Accede a materiales de estudio, bibliotecas virtuales y recursos educativos.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow-md">
              <AcademicCapIcon className="h-8 w-8 text-[#522B46] mb-2" />
              <h2 className="text-lg font-semibold text-[#522B46] mb-2">Eventos Destacados</h2>
              <p className="text-gray-700">Descubre los próximos eventos académicos, conferencias y actividades destacadas.</p>
            </div>
          </div>

          {/* Más secciones y componentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-100 rounded-xl shadow-md">
              <AcademicCapIcon className="h-8 w-8 text-[#522B46] mb-2" />
              <h2 className="text-lg font-semibold text-[#522B46] mb-2">Noticias Universitarias</h2>
              <p className="text-gray-700">Mantente informado sobre las últimas noticias y eventos de la universidad.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow-md">
              <AcademicCapIcon className="h-8 w-8 text-[#522B46] mb-2" />
              <h2 className="text-lg font-semibold text-[#522B46] mb-2">Biblioteca Virtual</h2>
              <p className="text-gray-700">Explora nuestra extensa biblioteca virtual con recursos digitales y libros electrónicos.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-xl shadow-md">
              <AcademicCapIcon className="h-8 w-8 text-[#522B46] mb-2" />
              <h2 className="text-lg font-semibold text-[#522B46] mb-2">Programas de Estudio</h2>
              <p className="text-gray-700">Consulta los programas de estudio disponibles y las áreas de especialización.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
