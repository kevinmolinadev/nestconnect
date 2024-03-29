import { useEffect, useState } from 'react';
import chatIcon from '../assets/home.jpg'; // Asegúrate de tener el ícono del chat en tus recursos.
import { Chat } from "../../infraestructure/api/chat"
import App from '../App';
import ForgotPassword from './ForgotPassword';
import Header from './Header';
import Assistant from './assistant';


function ChatScreen() {
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [answer, setAnswer] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    if (newMessage.trim()) {
      setMessages([...messages, { from: "assistant", text: answer }]);
      setNewMessage("")
      setAnswer('')
    }
  }, [answer])

  if (showChatScreen) {
    return <ChatScreen />;
  }

  if (showForgotPassword) {
    return <ForgotPassword />;
  }

  if (currentScreen === 'app') {
    return <App />;
  }

  if (currentScreen === 'assistant') {
    return <Assistant />;
  }

  const handleChatScreen = () => {
    setShowChatScreen(true);
  };

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

  const handleAssistant = () => {
    sessionStorage.setItem("chat",JSON.stringify(messages));
    setCurrentScreen("assistant")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutro-tertiary">
      <Header
        pageTitle="A.V.U."
        onHomeClick={() => setCurrentScreen('home')}
        onEventosClick={() => setCurrentScreen('eventos')}
        onAyudaClick={() => setCurrentScreen('ayuda')}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="chat-header bg-neutro-primary p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl text-white font-bold">Chat con A.V.U</h1>
          {
            messages.length >= 4 && (
              <button onClick={handleAssistant} className="px-4 py-2 text-white  border-white border-2 rounded-md hover:bg-white hover:transition-colors hover:text-black   duration-500 ">Contactar asesor</button>
            )
          }
        </div>
        <div className="chat-messages p-4 h-96 overflow-y-auto bg-white rounded-b-lg">
          {messages.map((message, index) => (
            <div key={index} className={`message whitespace-pre-line ${message.from === 'assistant' ? 'bg-gray-400' : 'bg-neutro-tertiary'} my-2 p-2 rounded-lg text-white`}>
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
