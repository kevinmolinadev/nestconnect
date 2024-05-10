import React, { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import EventosScreen from './pages/EventosScreen';
import ChatScreen from './pages/ChatScreen';
import ItemsScreen from './pages/ItemsScreen';
import FaqScreen from './pages/FaqScreen';
import ProfileScreen from './pages/ProfileScreen';
import HomeScreen from './pages/HomeScreen';
import { UserIcon, HomeIcon, LoginIcon, ChatAlt2Icon, CalendarIcon, QuestionMarkCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import logo from './assets/univallebarra.jpg';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para manejar la visibilidad del sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Cambiar el estado para ocultar/mostrar el sidebar
  };

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
        return <HomeScreen />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  const isActive = (screen) => currentScreen === screen ? 'bg-[#522B46] text-white' : 'text-gray-700 hover:bg-[#522B46] hover:text-white';

  return (
    <div className="flex h-screen">
      <div className={`transition-width duration-300 ${isSidebarOpen ? 'w-1/5' : 'w-0'} bg-[#E4E1E4] overflow-hidden`}>
        <div className="px-4 mt-4 flex flex-col items-center">
          <img src={logo} alt="Logo" className="mb-4" />
          <div className="space-y-2 w-full">
            {[
              { screen: 'home', icon: <HomeIcon className="h-5 w-5 mr-2" />, text: 'Home' },
              { screen: 'login', icon: <LoginIcon className="h-5 w-5 mr-2" />, text: 'Iniciar Sesión' },
              { screen: 'chatscreen', icon: <ChatAlt2Icon className="h-5 w-5 mr-2" />, text: 'Chat Bot' },
              { screen: 'eventos', icon: <CalendarIcon className="h-5 w-5 mr-2" />, text: 'Eventos' },
              { screen: 'itemscreen', icon: <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />, text: 'Objetos Perdidos' },
              { screen: 'faqscreen', icon: <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />, text: 'FAQ' },
            ].map(({ screen, icon, text }) => (
              <button onClick={() => setCurrentScreen(screen)} className={`flex items-center justify-start py-2 px-4 ${isActive(screen)} rounded border border-gray-400 w-3/4 mx-auto`}>
                {icon}<span className="ml-auto mr-auto">{text}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <button onClick={() => setCurrentScreen('profilescreen')} className={`flex items-center justify-center py-2 px-4 ${isActive('profilescreen')} rounded border border-gray-400 w-full`}>
            <UserIcon className="h-5 w-5 mr-2" />Perfil
          </button>
        </div>
      </div>
      <button onClick={toggleSidebar} className={`absolute top-1/2 -translate-y-1/2 z-10 ${isSidebarOpen ? 'left-[16%]' : 'left-0'} transition-all duration-300`}>
        {isSidebarOpen ? <ChevronLeftIcon className="h-8 w-8 text-gray-500" /> : <ChevronRightIcon className="h-10 w-10 text-gray-500" />}
      </button>
      <div className={`flex-grow overflow-y-auto transition-margin duration-300 ${isSidebarOpen }`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
