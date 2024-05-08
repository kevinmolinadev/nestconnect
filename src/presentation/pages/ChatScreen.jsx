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
    const [showPopup, setShowPopup] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const inactivityTimer = useRef(null);
    const [helpMessageSent, setHelpMessageSent] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [chatUnlocked, setChatUnlocked] = useState(false);

    const [showContactPopup, setShowContactPopup] = useState(false);

    

    const welcomeMessage = `Hola ${userName}, soy AVU. ¿En qué puedo ayudarte?`;

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
        if (chatUnlocked && userName) {
            const welcomeMessage = `Hola ${userName}, soy AVU. ¿En qué puedo ayudarte?`;
            setMessages([{ from: 'assistant', text: welcomeMessage }]);
        }
    }, [chatUnlocked, userName]);

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
            }, 30000);
        }

        return () => clearTimeout(inactivityTimer.current);
    }, [messages, helpMessageSent]);

    const validatePhone = (phone) => {
        const pattern = /^[67][0-9]{7}$/; // Must start with 6 or 7 and have exactly 8 digits
        const repeatingPattern = /(.)\1{4}/; // Cannot have four identical consecutive digits
        if (!pattern.test(phone)) {
            return "El número debe tener 8 dígitos.";
        }
        if (repeatingPattern.test(phone)) {
            return "El número no puede tener cinco dígitos iguales consecutivos.";
        }
        return "";
    };

    const handlePhoneChange = (e) => {
        const phone = e.target.value;
        setUserPhone(phone);
        const error = validatePhone(phone);
        setPhoneError(error);
    };

    const unlockChat = () => {
        const error = validatePhone(userPhone);
        if (error) {
            setPhoneError(error);
            return;
        }
        setChatUnlocked(true);
        setShowPopup(false);
    };

    const toggleListening = () => {
        window.speechSynthesis.cancel();
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const speakText = () => {
        const lastAssistantMessage = messages.reverse().find(m => m.from === 'assistant');
        if (lastAssistantMessage) {
            window.speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(lastAssistantMessage.text);
            speech.lang = 'es-ES';
            speech.voice = window.speechSynthesis.getVoices().find(v => v.lang === 'es-ES');
            speech.rate = 1.2;

            window.speechSynthesis.speak(speech);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowContactPopup(true);
        }, 40000); 
    }, []);

    const handleContactAdvisor = () => {
        const advisorNumbers = ["74169068", "77335220", "77335200", "62240222"];
        const formattedNumbers = advisorNumbers.map(num => `https://wa.me/591${num}`).join(", ");
        const message = `Aquí te dejo números para que te contactes con un asesor: ${formattedNumbers}`;
        setMessages(messages => [...messages, { from: 'assistant', text: message }]);
        setShowContactPopup(false);
    };

    const handleSendMessage = () => {
        window.speechSynthesis.cancel();
        if (newMessage.trim()) {
            setMessages(messages => [...messages, { from: 'user', text: newMessage }]);
            setIsTyping(true);
            // Animación al enviar mensaje
            setTimeout(() => setIsTyping(false), 2000);
            Chat.answerQuestions({ question: newMessage }).then(res => {
                setIsTyping(false);
                let fullResponse = res.result;
                let i = 0;
                const typeWriter = () => {
                    if (i < fullResponse.length) {
                        const partialResponse = fullResponse.slice(0, i + 1);
                        if (i === 0) {
                            setMessages(messages => [...messages, { from: 'assistant', text: partialResponse }]);
                        } else {
                            setMessages(messages => [...messages.slice(0, -1), { from: 'assistant', text: partialResponse }]);
                        }
                        i++;
                        setTimeout(typeWriter, 20);
                    }
                };
                typeWriter();
            });
            setNewMessage('');
        }
    };

    const handleNewMessageChange = (e) => {
        window.speechSynthesis.cancel();
        setNewMessage(e.target.value);
    };

    const renderMessage = (message) => {
        // Detecta URLs que no estén seguidas de un paréntesis cerrado.
        const urlRegex = /(https?:\/\/[^\s]+?)(?=[,.)]?(?:\s|$))/g;
        const phoneRegex = /(\b\d{8}\b)/g;

        // Dividir el texto en partes para procesar URLs y números de teléfono por separado
        return message.text.split(/(https?:\/\/[^\s]+|\b\d{8}\b)/g).map((part, index) => {
            if (urlRegex.test(part)) {
                // Verifica si la parte es una URL y excluye paréntesis al final
                const cleanPart = part.replace(/[)]$/, "");
                return (
                    <a key={index} href={cleanPart} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {cleanPart}
                    </a>
                );
            } else if (phoneRegex.test(part)) {
                // Maneja los números de teléfono para WhatsApp
                const whatsappUrl = `https://wa.me/591${part}`;
                return (
                    <a key={index} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {part}
                    </a>
                    
                );
            } else {
                // Regresa el texto que no es ni URL ni teléfono como un span normal
                return <span key={index}>{part}</span>;
            }
        });
    };

    const handleAssistantClick = () => {
        sessionStorage.setItem("chat", JSON.stringify(messages));
        setCurrentScreen("assistant");
        setShowPopup(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutro-tertiary">
            {showPopup && (
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Desbloquear Chat</h2>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                        <input type="text" id="userName" className="p-2 w-full rounded-lg border border-black" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userPhone" className="block text-gray-700 font-bold mb-2">Número de Teléfono:</label>
                        <input type="tel" id="userPhone" className="p-2 w-full rounded-lg border border-black" value={userPhone} onChange={handlePhoneChange} required />
                        {phoneError && <div className="text-red-500 text-sm mt-2">{phoneError}</div>}
                    </div>
                    <button type="button" onClick={unlockChat} className="bg-neutro-primary text-white py-2 px-4 rounded-lg hover:animate-pulse">Desbloquear Chat</button>
                </div>
            )}
            
            {!showPopup && (
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <Header
                        pageTitle="A.V.U."
                        onHomeClick={() => setCurrentScreen('home')}
                        onEventosClick={() => setCurrentScreen('eventos')}
                        onAyudaClick={() => setCurrentScreen('ayuda')}
                    />
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
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSendMessage(); }}
                        />
                        <button onClick={handleSendMessage} className="bg-neutro-primary text-white p-2 ml-2 rounded-lg hover:animate-pulse">
                            Enviar
                        </button>
                    </div>
                </div>
            )}
            {showContactPopup && (
            <div className="fixed right-4 top-4 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="font-bold text-lg">Contactar Asesor</h2>
                <p>¿Deseas hablar con un asesor ahora?</p>
                <button onClick={handleContactAdvisor} className="bg-neutro-tertiary text-white p-2 rounded hover:bg-gray-400 mt-2">
                    Contactar Asesor
                </button>
            </div>
        )}
            
        </div>
    );
}

export default ChatScreen;
