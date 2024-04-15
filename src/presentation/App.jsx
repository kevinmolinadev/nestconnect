import React, { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import EventosScreen from './pages/EventosScreen';
import ChatScreen from './pages/ChatScreen';
import ItemsScreen from './pages/ItemsScreen';
import FaqScreen from './pages/FaqScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import { UserIcon, HomeIcon, LoginIcon, ChatAlt2Icon, CalendarIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'; // Importa los iconos necesarios
import logo from './assets/univallebarra.jpg'; // Asegúrate de que esta ruta es correcta

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderContent = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'eventos':
        return <EventosScreen />;
      case 'chatscreen':
        return <ChatScreen />;
      case 'itemscreen':
        return <ItemsScreen />;
      case 'faqscreen':
        return <FaqScreen />;
      case 'profilescreen':
        return <ProfileScreen onLogoutComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen />; // El contenido de tu home
      default:
        return <div>Selecciona una opción</div>; // Mensaje por defecto
    }
  };

  const isActive = (screen) => currentScreen === screen ? 'bg-[#522B46] text-white' : 'text-gray-700 hover:bg-[#522B46] hover:text-white';

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-[#E4E1E4] flex flex-col justify-between">
        <div className="px-4 mt-4 flex flex-col items-center">
          <img src={logo} alt="Logo" className="mb-4" />
          <div className="space-y-2 w-full">
            <button onClick={() => setCurrentScreen('home')} className={`flex items-center justify-center py-2 px-4 ${isActive('home')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <HomeIcon className="h-5 w-5 mr-2" />Home
            </button>
            <button onClick={() => setCurrentScreen('login')} className={`flex items-center justify-center py-2 px-4 ${isActive('login')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <LoginIcon className="h-5 w-5 mr-2" />Iniciar Sesión
            </button>
            <button onClick={() => setCurrentScreen('chatscreen')} className={`flex items-center justify-center py-2 px-4 ${isActive('chatscreen')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <ChatAlt2Icon className="h-5 w-5 mr-2" />Chat Bot
            </button>
            <button onClick={() => setCurrentScreen('eventos')} className={`flex items-center justify-center py-2 px-4 ${isActive('eventos')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <CalendarIcon className="h-5 w-5 mr-2" />Eventos
            </button>
            <button onClick={() => setCurrentScreen('itemscreen')} className={`flex items-center justify-center py-2 px-4 ${isActive('itemscreen')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />Objetos Perdidos
            </button>
            <button onClick={() => setCurrentScreen('faqscreen')} className={`flex items-center justify-center py-2 px-4 ${isActive('faqscreen')} rounded border border-gray-400 w-3/4 mx-auto`}>
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />FAQ
            </button>
          </div>
        </div>
        <div className="pb-4 px-4">
          <button onClick={() => setCurrentScreen('profilescreen')} className={`flex items-center justify-center py-2 px-4 ${isActive('profilescreen')} rounded border border-gray-400 w-3/4 mx-auto`}>
            <UserIcon className="h-5 w-5 mr-2" />Perfil
          </button>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
