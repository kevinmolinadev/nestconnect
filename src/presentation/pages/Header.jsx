import React from 'react';

const Header = ({ pageTitle, onHomeClick, onEventosClick, onAyudaClick }) => {
  return (
    <header className="bg-neutro-tertiary text-white flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      <nav>
        <button onClick={onHomeClick} className="text-white py-2 px-4 hover:bg-white hover:text-wine rounded transition duration-300">Home</button>
        <button onClick={onEventosClick} className="text-white py-2 px-4 hover:bg-white hover:text-wine rounded transition duration-300 ml-4">Eventos</button>
        <button onClick={onAyudaClick} className="text-white py-2 px-4 hover:bg-white hover:text-wine rounded transition duration-300 ml-4">Ayuda</button>
      </nav>
    </header>
  );
};

export default Header;