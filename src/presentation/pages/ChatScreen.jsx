import React, { useEffect, useState, useRef } from 'react';
import { Chat } from "../../infraestructure/api/chat";
import App from '../App';
import ForgotPassword from './ForgotPassword';
import Header from './Header';
import Assistant from './assistant';

function ChatScreen() {
    const [showChatScreen, setShowChatScreen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('home');
    const [showPopup, setShowPopup] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const inactivityTimer = useRef(null);
    const [helpMessageSent, setHelpMessageSent] = useState(false);  // Estado para controlar si se ha enviado el mensaje de ayuda

    useEffect(() => {
        const welcomeMessage = "Hola soy AVU, bienvenido. ¿En qué puedo ayudarte?";
        let i = 0;
        const typeWriter = () => {
            if (i < welcomeMessage.length) {
                const partialWelcome = welcomeMessage.slice(0, i + 1);
                setMessages([{ from: 'assistant', text: partialWelcome }]);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        typeWriter();
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onerror = (event) => {
            console.error("Error en el reconocimiento de voz:", event.error);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setNewMessage(prev => prev + (prev.length > 0 ? " " : "") + transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognition.stop();
            recognitionRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!helpMessageSent) {
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = setTimeout(() => {
                setMessages(messages => [...messages, { from: 'assistant', text: "¿Necesitas ayuda en algo más?" }]);
                setHelpMessageSent(true);
            }, 5000);
        }

        return () => clearTimeout(inactivityTimer.current);
    }, [messages, helpMessageSent]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const speakText = () => {
        const lastAssistantMessage = messages.reverse().find(m => m.from === 'assistant');
        if (lastAssistantMessage) {
            const speech = new SpeechSynthesisUtterance(lastAssistantMessage.text);
            speech.lang = 'es-ES';
            speech.voice = window.speechSynthesis.getVoices().find(v => v.lang === 'es-ES');
            speech.rate = 1.2;
            window.speechSynthesis.speak(speech);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(messages => [...messages, { from: 'user', text: newMessage }]);
            setIsTyping(true);
            setHelpMessageSent(false);  // Reset this flag so help message can be sent again if necessary

            Chat.answerQuestions({ question: newMessage }).then(res => {
                setIsTyping(false);
                let fullResponse = res.result;
                setMessages(messages => [...messages, { from: 'assistant', text: fullResponse }]);
            });

            setNewMessage('');
        }
    };

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const renderMessage = (message) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const phoneRegex = /(\b\d{8}\b)/g; 
    
        return message.text.split(/(https?:\/\/[^\s]+|\b\d{8}\b)/g).map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {part}
                    </a>
                );
            } else if (phoneRegex.test(part)) {
                const whatsappUrl = `https://wa.me/591${part}`; 
                return (
                    <a key={index} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {part}
                    </a>
                );
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    const handleAssistantClick = () => {
        sessionStorage.setItem("chat", JSON.stringify(messages));
        setCurrentScreen("assistant");
        setShowPopup(false);
    };

    if (currentScreen === 'assistant') {
        return <Assistant />;
    } else if (currentScreen === 'app') {
        return <App />;
    } else if (showForgotPassword) {
        return <ForgotPassword />;
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
                    <button onClick={speakText} className="bg-neutro-primary text-white py-2 px-4 rounded-lg hover:animate-pulse border border-gray-300">
                        Leer Respuesta
                    </button>
                </div>
                <div className="chat-messages p-4 h-96 overflow-y-auto bg-white rounded-b-lg">
                    {messages.map((message, index) => (
                        <div key={index} className={`whitespace-pre-line ${message.from === 'user' ? 'bg-neutro-tertiary' : 'bg-gray-400'} my-2 p-2 rounded-lg text-white`}>
                            {renderMessage(message)}
                        </div>
                    ))}
                    {isTyping && <div className="message bg-gray-400 my-2 p-2 rounded-lg text-white">Cargando...</div>}
                </div>
                <div className="chat-input p-4 flex items-center">
                    <button onClick={toggleListening} className={`bg-neutro-primary text-white py-2 px-4 rounded-lg mr-2 ${isListening ? 'bg-red-500' : ''}`}>
                        {isListening ? '🛑' : '🎤'}
                    </button>
                    <input
                        type="text"
                        className="p-2 w-full rounded-lg border border-black"
                        placeholder="Escribe tu mensaje aquí..."
                        value={newMessage}
                        onChange={handleNewMessageChange}
                    />
                    <button onClick={handleSendMessage} className="bg-neutro-primary text-white p-2 ml-2 rounded-lg hover:animate-pulse">
                        Enviar
                    </button>
                </div>
            </div>
            {showPopup && (
                <div className="fixed bottom-5 right-5">
                    <div className="bg-white p-5 rounded-lg shadow-xl text-center">
                        <h2 className="text-lg font-bold mb-2">¿Necesitas ayuda?</h2>
                        <p className="mb-2">Nuestro asesor está listo para ayudarte.</p>
                        <button onClick={handleAssistantClick} className="bg-neutro-primary text-white py-2 px-4 rounded-lg w-full hover:animate-pulse">
                            Contactar Asesor
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatScreen;
