import { useEffect, useState } from 'react';
import chatIcon from '../assets/home.jpg'; // Asegúrate de tener el ícono del chat en tus recursos.
import { Chat } from "../../infraestructure/api/chat"
import App from '../App';
import ForgotPassword from './ForgotPassword';


function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'user', text: '¿Puedes darme información sobre las inscripciones?' },
    { from: 'bot', text: '¡Claro! Las inscripciones están abiertas hasta el 02/03/2024. ¿Te gustaría saber más sobre las becas disponibles?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [answer, setAnswer] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');


  useEffect(() => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: "bot", text: answer }]);
    }
    setNewMessage("")
  }, [answer])

  const handleSendMessage = () => {
    setMessages([...messages, { from: 'user', text: newMessage }])
    handleAnswer(newMessage)
  };

  const handleAnswer = (message) => {
    Chat.answerQuestions({ question: message }).then(res => {
      setAnswer(res.result)
    });
  }

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  if (showForgotPassword) {
    return <ForgotPassword />;
  }


  const showApp = () => setCurrentScreen('app');
  if (currentScreen === 'app') {
    return <App />;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutro-tertiary">
      <header className="w-full bg-neutro-primary p-4 flex justify-between items-center mb-8">
        <img src={chatIcon} alt="Home" className="w-10 h-10" />
        <nav>
          <button onClick={showApp} className="text-white font-semibold mr-4">Home</button>
          <button className="text-white font-semibold">Contacto</button>
        </nav>
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="chat-header bg-neutro-primary p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Chat con A.V.U</h1>
          <img src={chatIcon} alt="Chat Icon" className="w-10 h-10" />
        </div>
        <div className="chat-messages p-4 h-96 overflow-y-auto bg-white rounded-b-lg">
          {messages.map((message, index) => (
            <div key={index} className={`message whitespace-pre-line ${message.from === 'bot' ? 'bg-gray-400' : 'bg-neutro-tertiary'} my-2 p-2 rounded-lg text-white`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input p-4">
          <input
            type="text"
            className="p-2 w-full rounded-lg border border-black"
            placeholder="Escribe tu mensaje aquí..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} className="bg-neutro-primary text-white p-2 mt-2 rounded-lg w-full">
            Enviar
          </button>
          <div className="mt-4">
            <a onClick={handleForgotPasswordClick} className="text-xl text-black cursor-pointer">
              Preguntas Frecuentes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
