import React, { useState } from 'react';
import chatIcon from './assets/home.jpg'; // Asegúrate de tener el ícono del chat en tus recursos.
import logo from './assets/univallebarra.jpg'; // Logo de la universidad
import imageCarousel1 from './assets/home.jpg'; // Imágenes para el carrusel
//import imageCarousel2 from './assets/image2.jpg';
//import imageCarousel3 from './assets/image3.jpg';
import facebookLogo from './assets/home.jpg'; // Logo de Facebook
import instagramLogo from './assets/home.jpg'; // Logo de Instagram
import twitterLogo from './assets/home.jpg';

function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'user', text: '¿Puedes darme información sobre las inscripciones?' },
    { from: 'bot', text: '¡Claro! Las inscripciones están abiertas hasta el 02/03/2024. ¿Te gustaría saber más sobre las becas disponibles?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: 'user', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/2 p-4 bg-neutro-tertiary">
        <div className="mb-4">
          <img src={logo} alt="Universidad del Valle" className="block mx-auto" />
        </div>
        <div className="mb-4">
          {/* Aquí puedes insertar tu carrusel de imágenes */}
          <img src={imageCarousel1} alt="Imagen del carrusel" className="w-1/2 h-auto mx-auto" />
          {/* Repetir con imageCarousel2, imageCarousel3, etc. */}
        </div>
        {/* Añadir enlaces a redes sociales aquí */}

        <div className="p-4 flex justify-center items-center border-t border-neutro-primary">
          <a href="https://www.facebook.com/UnivalleBolivia" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" className="h-8 mx-2" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" className="h-8 mx-2" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt="Twitter" className="h-8 mx-2" />
          </a>
          {/* Añade más logos y enlaces según sea necesario */}
        </div>
      </div>
      
      <div className="w-1/2 bg-white p-4 flex flex-col">
  <div className="chat-screen bg-white flex-grow flex flex-col">
    <div className="chat-header bg-neutro-tertiary p-2 rounded-t-lg flex justify-between items-center">
      <div className="chat-title text-xl text-white font-bold">Preguntas Frecuentes</div>
      <img src={chatIcon} alt="Chat Icon" className="w-8 h-8" />
    </div>
    <div className="chat-messages flex-grow p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.from === 'bot' ? 'bg-gray-300' : 'bg-neutro-tertiary'} my-2 p-2 rounded-lg text-white`}>
          {message.text}
        </div>
      ))}
    </div>
    <div className="chat-input p-2">
      <input
        type="text"
        className="p-2 w-full rounded-lg"
        placeholder="Escribe tu mensaje aquí..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage} className="bg-neutro-primary text-white p-2 mt-2 rounded-lg w-full">
        Enviar
      </button>
    </div>
  </div>
</div>

    </div>
  );
}

export default ChatScreen;
