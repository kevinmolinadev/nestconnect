import { useState, useEffect, useRef } from "react";
import { ChatService } from "../../infraestructure";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
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
    const [isAnonymous, setIsAnonymous] = useState(true); 
    const [userMessageCount, setUserMessageCount] = useState(0);
    const [playableMessageIndex, setPlayableMessageIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [interests, setInterests] = useState([]);

    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showAdvisorContactForm, setShowAdvisorContactForm] = useState(false);
    const [confirmationMessageVisible, setConfirmationMessageVisible] = useState(false);

    const welcomeMessage = isAnonymous ? "Hola Visitante, soy AVU. ¿En qué puedo ayudarte?" : `Hola ${userName}, soy AVU. ¿En qué puedo ayudarte?`;

    useEffect(() => {
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
    }, [welcomeMessage]);

    useEffect(() => {
        if (chatUnlocked && !isAnonymous) {
            const welcomeMessage = `Hola ${userName}, soy AVU. ¿En qué puedo ayudarte?`;
            setMessages([{ from: 'assistant', text: welcomeMessage }]);
        }
    }, [chatUnlocked, userName, isAnonymous]);

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
        if (userMessageCount > 1 && !helpMessageSent) {
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = setTimeout(() => {
                setMessages(messages => [...messages, { from: 'assistant', text: "¿Necesitas ayuda en algo más?" }]);
                setHelpMessageSent(true);
            }, 30000);
        }

        return () => clearTimeout(inactivityTimer.current);
    }, [messages, helpMessageSent, userMessageCount]);

    useEffect(() => {
        const savedChat = sessionStorage.getItem("chat");
        if (savedChat) {
            try {
                const parsedChat = JSON.parse(savedChat);
                setMessages(parsedChat);
            } catch (error) {
                console.error("Error al analizar el JSON del chat:", error);
                setMessages([]);
            }
        }
    }, []);

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
        if (!userName && !userPhone) {
            console.log("Ingresando en modo anónimo.");
            setIsAnonymous(true);
        } else if (!userName || !userPhone) {
            console.log("Por favor, complete ambos campos del formulario.");
            return;
        } else {
            console.log("Ingresando con datos.");
            setIsAnonymous(false);
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

    const handleContactAdvisor = () => {
        setContactAdvisorClicked(true);
        logUserData();
        if (isAnonymous) {
            setShowAdvisorContactForm(true);
        } else {
            setMessages(messages => [...messages, { from: 'user', text: "Contactar Asesor" }]);
            setIsTyping(true);
            ChatService.answerQuestion({ question: "Contactar Asesor" }).then(res => {
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
            setShowContactPopup(false);
        }
    };
    
    const sendQuerry = () => {
        const data = {
            nombre: userName,
            telefono: userPhone,
            ["carreras de interes"]: interests.join(", ")
        };

        console.log(data);

        if (isAnonymous) {
            setConfirmationMessageVisible(true);
            setTimeout(() => setConfirmationMessageVisible(false), 3000);
        }
        setShowContactPopup(false);
        setShowAdvisorContactForm(false); 
    };

    const [advisorPopupShown, setAdvisorPopupShown] = useState(false);
    useEffect(() => {
        if (userMessageCount > 2 && !advisorPopupShown && !
            showAdvisorContactForm) {
                const timer = setTimeout(() => {
                    if (isAnonymous) {
                        setShowContactPopup(true);
                    } else {
                        setShowAdvisorContactForm(true);
                    }
                    setAdvisorPopupShown(true);
                }, 10000);
        
                return () => clearTimeout(timer);
            }
        }, [userMessageCount, advisorPopupShown, isAnonymous, showAdvisorContactForm]);
        
        const careerKeywords = {
            "medicina": ["medicina"],
            "bioquimica y farmacia": ["bioquimica", "farmacia"],
            "licenciatura en fisioterapia y kinesiologia": ["fisioterapia", "kinesiologia"],
            "licenciatura en nutricion y dietetica": ["nutricion", "dietetica"],
            "ingenieria industrial": ["industrial"],
            "ingenieria en comercio internacional": ["comercio internacional"],
            "licenciatura en comercio internacional": ["comercio"],
            "licenciatura en derecho y ciencias juridicas": ["derecho", "ciencias juridicas", "juridicas"],
            "licenciatura en administracion de empresas": ["administracion", "empresas"],
            "licenciatura en psicologia": ["psicologia"],
            "ingenieria en ciencias de datos e inteligencia de negocios": ["datos", "inteligencia de negocios"],
            "ingenieria biomedica": ["biomedica"],
            "ingenieria de sistemas informaticos": ["sistemas", "informaticos"],
            "licenciatura en arquitectura y urbanismo": ["arquitectura", "urbanismo"],
            "licenciatura en diseño grafico y comunicacion visual": ["diseño grafico", "comunicacion visual"],
            "licenciatura en gastronomia": ["gastronomia"],
            "ingenieria civil": ["civil"],
            "ingenieria aeronautica": ["aeronautica"],
            "ingenieria mecatronica": ["mecatronica"]
        };
        
        const findCareersInMessage = (message) => {
            const foundCareers = [];
            Object.entries(careerKeywords).forEach(([career, keywords]) => {
                const matchFound = keywords.some(keyword => message.toLowerCase().includes(keyword));
                if (matchFound) {
                    foundCareers.push(career);
                }
            });
            return foundCareers;
        };
        
        const [lastAssistantMessageComplete, setLastAssistantMessageComplete] = useState(false);
        
        const handleSendMessage = () => {
            window.speechSynthesis.cancel();
            if (newMessage.trim()) {
                setMessages(messages => [...messages, { from: 'user', text: newMessage }]);
                setIsTyping(true);

                setLastAssistantMessageComplete(false);
                setTimeout(() => setIsTyping(false), 2000);
                ChatService.answerQuestion({ question: newMessage }).then(res => {
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
                        } else {
                            setLastAssistantMessageComplete(true);
                            setPlayableMessageIndex(messages.length);
                        }
                    };
                    typeWriter();
                });
                setNewMessage('');
                setUserMessageCount(count => count + 1);
                const updatedInterests = findCareersInMessage(newMessage);
                setInterests(prev => [...new Set([...prev, ...updatedInterests])]);
            }
        };
        
        const handleNewMessageChange = (e) => {
            window.speechSynthesis.cancel();
            setNewMessage(e.target.value);
        };
        
        const renderMessage = (message, index) => {
            // Detecta URLs que no estén seguidas de un paréntesis cerrado o punto al final.
            const urlRegex = /(https?:\/\/[^\s]+?)(?=[,.)]?(?:\s|$))/g;
            const phoneRegex = /(\b\d{8}\b)/g;
        
            // Función para manejar el evento de clic en el botón de voz
            
            const handleVoiceClick = (text) => {
    if (!isPlaying) {
        window.speechSynthesis.cancel(); // Cancela cualquier síntesis de voz activa
        
        // Divide el texto en fragmentos más pequeños
        const textFragments = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        let currentFragment = 0;
        
        const speakFragment = () => {
            if (currentFragment < textFragments.length) {
                const speech = new SpeechSynthesisUtterance(textFragments[currentFragment]);
                speech.lang = 'es-ES';
                speech.rate = 1;
                
                const setVoice = () => {
                    const voices = window.speechSynthesis.getVoices();
                    const spanishVoice = voices.find(voice => voice.lang === 'es-ES');
                    
                    if (spanishVoice) {
                        speech.voice = spanishVoice;
                    } else {
                        console.error("No se encontró una voz en español. Usando voz por defecto.");
                    }
                    
                    window.speechSynthesis.speak(speech);
                };
                
                if (speechSynthesis.getVoices().length === 0) {
                    window.speechSynthesis.onvoiceschanged = setVoice;
                } else {
                    setVoice();
                }
                
                speech.addEventListener('start', () => {
                    setIsPlaying(true);
                    setPlayableMessageIndex(index);
                });
                
                speech.addEventListener('end', () => {
                    currentFragment++;
                    if (currentFragment < textFragments.length) {
                        setTimeout(speakFragment, 200); // Pequeña pausa entre fragmentos
                    } else {
                        setIsPlaying(false);
                        setPlayableMessageIndex(null);
                    }
                });
            }
        };
        
        speakFragment();
    } else {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setPlayableMessageIndex(null);
    }
};
        
    
        
            // Dividir el texto en partes para procesar URLs y números de teléfono por separado
            return (
                <div>
                    {message.text.split(/(https?:\/\/[^\s]+|\b\d{8}\b)/g).map((part, index) => {
                        if (urlRegex.test(part)) {
                            // Extrae el enlace limpio
                            const cleanPart = part.match(urlRegex)[0];
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
                    })}
                    {message.from === 'assistant' && lastAssistantMessageComplete && (
                    <button onClick={() => handleVoiceClick(message.text)} className="ml-auto">
                        <span role="img" aria-label={isPlaying && index === playableMessageIndex ? "Detener reproducción" : "Reproducir mensaje"} className="text-lg">
                            {isPlaying && index === playableMessageIndex ? '⏹️' : '🔊'}
                        </span>
                    </button>
                    )}
                </div>
            );
        };
     
        return (
            <div className="flex flex-col items-center justify-center relative flex-grow bg-gray-tertiary">
           {showPopup && (
               <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                   <h2 className="text-xl font-bold mb-4">Desbloquear Chat</h2>
                   <div className="mb-4">
                       <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                       <input type="text" id="userName" className="p-2 w-full rounded-lg border border-black" value={userName} onChange={(e) => setUserName(e.target.value)} />
                   </div>
                   <div className="mb-4">
                       <label htmlFor="userPhone" className="block text-gray-700 font-bold mb-2">Número de Teléfono:</label>
                       <input type="tel" id="userPhone" className="p-2 w-full rounded-lg border border-black" value={userPhone} onChange={handlePhoneChange} />
                       {phoneError && <div className="text-red-500 text-sm mt-2">{phoneError}</div>}
                   </div>
                   <button type="button" onClick={unlockChat} className="bg-neutro-primary text-white py-2 px-4 rounded-lg hover:animate-pulse">Desbloquear Chat</button>
                   {!isAnonymous && (
                       <div className="text-red-500 text-sm mt-2">Por favor complete ambos campos del formulario.</div>
                   )}
               </div>
           )}

           {!showPopup && (
               <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                   <div className="chat-header bg-neutro-primary p-6 rounded-t-lg flex justify-between items-center">
                       <h1 className="text-2xl text-white font-bold">Chat con A.V.U</h1>
                       <button onClick={speakText} className="bg-neutro-primary text-white py-2 px-4 rounded-lg hover:animate-pulse border border-gray-300">
                           Leer Respuesta
                       </button>
                   </div>
                   <div className="chat-messages p-6 h-[50vh] overflow-y-auto bg-white rounded-b-lg">
                       {messages.map((message, index) => (
                           <div key={index} className={`whitespace-pre-line ${message.from === 'user' ? 'bg-neutro-tertiary' : 'bg-gray-400'} my-2 p-2 rounded-lg text-white`}>
                               {renderMessage(message, index)}
                           </div>
                       ))}
                       {isTyping && <div className="message bg-gray-400 my-2 p-2 rounded-lg text-white">Cargando...</div>}
                   </div>
                   <div className="chat-input p-6 flex items-center">
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
               <div className="absolute top-6 right-6 bg-white p-4 shadow-lg rounded-lg">
                   <h2 className="font-bold text-lg">Contactar Asesor</h2>
                   <p>¿Deseas hablar con un asesor ahora?</p>
                   <button onClick={handleContactAdvisor} className="bg-neutro-tertiary w-full text-white p-2 rounded-md hover:bg-gray-400 mt-2">
                       {isAnonymous ? 'Enviar formulario' : 'Contactar Asesor'}
                   </button>
               </div>
           )}

           {showAdvisorContactForm && (
               <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center">
                   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                       <h2 className="text-xl font-bold mb-4">Formulario de Contacto</h2>
                       <div>
                           <label htmlFor="contactName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                           <input type="text" id="contactName" className="p-2 w-full rounded-lg border border-black" value={userName} onChange={(e) => setUserName(e.target.value)} />
                       </div>
                       <div className="mb-4">
                           <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">Número de Teléfono:</label>
                           <input type="tel" id="contactPhone" className="p-2 w-full rounded-lg border border-black" value={userPhone} onChange={handlePhoneChange} />
                           {phoneError && <div className="text-red-500 text-sm mt-2">{phoneError}</div>}
                       </div>
                       <button type="button" onClick={() => { setShowAdvisorContactForm(false); sendQuerry(); }} className="bg-neutro-primary text-white py-2 px-4 rounded-lg hover:animate-pulse">Enviar</button>
                       <button type="button" onClick={() => setShowAdvisorContactForm(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:animate-pulse ml-4">Cancelar</button>
                   </div>
               </div>
           )}

           {confirmationMessageVisible && (
               <div className="fixed bottom-10 right-10 bg-neutro-tertiary text-white p-4 rounded-lg">
                   Gracias por rellenar el formulario, un asesor se contactará contigo.
               </div>
           )}
       </div>
   );
}

export default Chat;