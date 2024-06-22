import { useState, useEffect, useRef, useContext } from "react";
import { ErrorContext } from "../context/error"
import { ChatService, QueryService } from "../../infraestructure";

const Chat = () => {
    const { updateError } = useContext(ErrorContext)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showPopup, setShowPopup] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const recognitionRef = useRef(null);
    const inactivityTimer = useRef(null)
    const [helpMessageSent, setHelpMessageSent] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [chatUnlocked, setChatUnlocked] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [userMessageCount, setUserMessageCount] = useState(0);
    const [playableMessageIndex, setPlayableMessageIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [interests, setInterests] = useState([]);

    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showAdvisorContactForm, setShowAdvisorContactForm] = useState(false);
    const [confirmationMessageVisible, setConfirmationMessageVisible] = useState(false);
    const [lastAssistantMessageComplete, setLastAssistantMessageComplete] = useState(false);

    const welcomeMessage = isAnonymous ? "Hola Visitante, soy AVU. ¿En qué puedo ayudarte?" : `Hola ${userName}, soy AVU. ¿En qué puedo ayudarte?`;
    const careerKeywords = {
        "Medicina": ["medicina"],
        "Bioquímica y Farmacia": ["bioquímica", "farmacia"],
        "Licenciatura en Fisioterapia y Kinesiología": ["fisioterapia", "kinesiología"],
        "Licenciatura en Nutrición y Dietética": ["nutrición", "dietética"],
        "Ingeniería Comercial": ["ingeniería comercial", "comercial"],
        "Ingeniería en Comercio Internacional": ["comercio internacional"],
        "Licenciatura en Derecho y Ciencias Jurídicas": ["derecho", "ciencias jurídicas", "jurídicas"],
        "Licenciatura en Administración de Empresas": ["administración de empresas", "administración", "empresas"],
        "Licenciatura en Psicología": ["psicología"],
        "Ingeniería en Ciencia de Datos e Inteligencia de Negocios": ["ciencia de datos", "inteligencia de negocios", "datos"],
        "Ingeniería Biomédica": ["ingeniería biomédica", "biomédica"],
        "Ingeniería de Sistemas Informáticos": ["sistemas informáticos", "informáticos", "sistemas"],
        "Licenciatura en Arquitectura y Urbanismo": ["arquitectura", "urbanismo"],
        "Licenciatura en Diseño Gráfico y Comunicación Visual": ["diseño gráfico", "comunicación visual"],
        "Licenciatura en Gastronomía": ["gastronomía"],
        "Ingeniería Civil": ["ingeniería civil", "civil"],
        "Ingeniería Aeronáutica": ["ingeniería aeronáutica", "aeronáutica"],
        "Ingeniería Mecánica y de Automatización Industrial": ["ingeniería mecánica", "automatizacion industrial"],
        "Ingeniería Industrial": ["ingeniería industrial", "industrial"]
    };

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
        const repeatingPattern = /(.)\1{5}/;
        if (repeatingPattern.test(phone)) return true;
        return false
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(name)) {
            setUserName(name);
        } else {
            updateError("Por favor, introduce solo un nombre válido.");
        }
    };

    const handlePhoneChange = (e) => {
        const phone = e.target.value;
        if (phone.length <= 8) {
            setUserPhone(phone);
            if (validatePhone(phone)) updateError("El número no puede tener seis dígitos iguales consecutivos.");
        }
    };

    const unlockChat = () => {
        if (userName && userPhone) {
            if (userPhone.length !== 8) return updateError("El numero debe tener 8 digitos")
            if (!userPhone.match(/^[67].*/) || validatePhone(userPhone)) return updateError("El numero ingresado no es un numero valido")
            setIsAnonymous(false);
            setChatUnlocked(true);
            setShowPopup(false);
        } else {
            updateError("Por favor, complete ambos campos del formulario para iniciar el chat");
        }
    };

    const toggleListening = () => {
        window.speechSynthesis.cancel();
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };


    const sendAdvisorts = () => {
        setIsLoading(false);
        ChatService.answerQuestion({ question: "Quiero contactar a un asesor" }).then(res => {
            setIsLoading(true);
            setIsTyping(true);
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
                    setIsTyping(false);
                    setPlayableMessageIndex(messages.length);
                }
            };
            typeWriter();
        });
    }

    const handleContactAdvisor = () => {
        if (isAnonymous) {
            setShowAdvisorContactForm(true);
        } else {
            sendQuerry();
            sendAdvisorts();
        }
        setShowContactPopup(false);
    };

    const sendQuerry = async () => {
        const data = {
            Nombre: userName,
            Telefono: userPhone,
            ["Carreras de interes"]: interests.join(", ")
        };
        await QueryService.create({ data });
        setConfirmationMessageVisible(true);
        setTimeout(() => setConfirmationMessageVisible(false), 3000);
    };

    useEffect(() => {
        if (userMessageCount === 3 && !showContactPopup && !showAdvisorContactForm) {
            const timer = setTimeout(() => {
                setShowContactPopup(true);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [newMessage]);

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

    const handleSendMessage = () => {
        window.speechSynthesis.cancel();
        if (newMessage.trim()) {
            setIsTyping(true);
            setIsLoading(false);
            setMessages(messages => [...messages, { from: 'user', text: newMessage }]);
            setLastAssistantMessageComplete(false);
            ChatService.answerQuestion({ question: newMessage }).then(res => {
                setIsLoading(true);
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
                        setIsTyping(false)
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
        const urlRegex = /(https?:\/\/[^\s,]+\.pdf)/g;
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
                        speech.rate = 1.2;
                        const voices = window.speechSynthesis.getVoices().filter(item => item.lang === "es-ES");
                        speech.voice = voices.find(voice => voice.name === "Google español") ?? voices[4];

                        const setVoice = () => {
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
                                speakFragment()
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

        return (
            <div>
                {message.text.split(/(https?:\/\/[^\s]+|\b\d{8}\b)/g).map((part, index) => {
                    if (urlRegex.test(part)) {
                        const cleanPart = part.match(urlRegex)[0];
                        return (
                            <div key={index} className="flex justify-start items-center py-2">
                                <a href={cleanPart} target="_blank" rel="noopener noreferrer" className="p-1 px-2 rounded-md bg-neutro-tertiary no-underline flex justify-center items-center gap-1">
                                    <p className="font-semibold">PDF</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                                </a>
                            </div>
                        );
                    } else if (phoneRegex.test(part)) {
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
                    <button onClick={() => handleVoiceClick(message.text)} className="block hover:scale-105 duration-300 transition-transform">
                        <span role="img" aria-label={isPlaying && index === playableMessageIndex ? "Detener reproducción" : "Reproducir mensaje"}>
                            {isPlaying && index === playableMessageIndex ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5"><circle cx="12" cy="12" r="10" /><line x1="10" x2="10" y1="15" y2="9" /><line x1="14" x2="14" y1="15" y2="9" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>}
                        </span>
                    </button>
                )}
            </div>
        );
    };


    const handleSendOfData = () => {
        if (userName && userPhone) {
            if (userPhone.length !== 8) return updateError("El numero debe tener 8 digitos")
            if (!userPhone.match(/^[67].*/) || validatePhone(userPhone)) return updateError("El numero ingresado no es un numero valido")
            setShowAdvisorContactForm(false);
            sendQuerry();
            sendAdvisorts()
        } else {
            updateError("Por favor, complete ambos campos del formulario")
        }
    }


    return (
        <div className="flex flex-col items-center justify-center relative flex-grow bg-gray-tertiary">
            {showPopup && (
                <div className="bg-white p-10 rounded-lg shadow-lg mx-4 max-w-2xl relative">
                    <span className="absolute top-6 right-6 w-12 text-gray-700">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 2H13V1H11V2H7C5.34315 2 4 3.34315 4 5V8C4 10.7614 6.23858 13 9 13H15C17.7614 13 20 10.7614 20 8V5C20 3.34315 18.6569 2 17 2ZM11 7.5C11 8.32843 10.3284 9 9.5 9C8.67157 9 8 8.32843 8 7.5C8 6.67157 8.67157 6 9.5 6C10.3284 6 11 6.67157 11 7.5ZM16 7.5C16 8.32843 15.3284 9 14.5 9C13.6716 9 13 8.32843 13 7.5C13 6.67157 13.6716 6 14.5 6C15.3284 6 16 6.67157 16 7.5ZM4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4Z"></path></svg>
                    </span>
                    <h2 className="text-3xl font-semibold mb-4">Ayudanos a mejorar tu experiencia</h2>
                    <p className="mb-6 text-gray-700">Rellenar tus datos nos permite ofrecerte una experiencia personalizada y directa. Aunque puedes entrar anónimamente, te recomendamos que ingreses tu información para un mejor servicio.</p>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                        <input type="text" id="userName" className="p-2 w-full rounded-lg border border-black" value={userName} onChange={handleNameChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userPhone" className="block text-gray-700 font-bold mb-2">Número de Teléfono:</label>
                        <input type="tel" id="userPhone" className="p-2 w-full rounded-lg border border-black" value={userPhone} onChange={handlePhoneChange} />
                    </div>
                    <button type="button" onClick={unlockChat} className="bg-neutro-tertiary text-white py-2 px-4 rounded-lg hover:animate-pulse">Comenzar</button>
                    <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:animate-pulse ml-4">Omitir</button>
                </div>
            )}

            {!showPopup && (
                <div className="bg-white flex flex-col rounded-lg shadow-lg w-full h-full max-sm:flex-grow max-w-2xl">
                    <div className="max-sm:hidden  bg-neutro-tertiary p-6 rounded-t-lg flex justify-between items-center">
                        <h1 className="text-2xl text-white font-bold">Chat con A.V.U</h1>
                    </div>
                    <div className="p-6 max-sm:flex-grow h-[50vh] overflow-y-auto bg-white rounded-b-lg">
                        {messages.map((message, index) => (
                            <div key={index} className={`whitespace-pre-line ${message.from === 'user' ? 'bg-neutro-tertiary' : 'bg-gray-400'} my-2 p-2 rounded-lg text-white`}>
                                {renderMessage(message, index)}
                            </div>
                        ))}
                        {!isLoading &&
                            <div className="flex gap-1 bg-gray-400 my-2 p-3 rounded-lg items-center w-[10%]">
                                <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                            </div>}
                    </div>
                    <div className="chat-input p-6 flex gap-2">
                        <button onClick={toggleListening} className={`bg-neutro-tertiary text-white px-2.5  rounded-lg  ${isListening ? 'bg-red-500' : ''}`}>
                            {isListening ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6"><line x1="2" x2="22" y1="2" y2="22" /><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" /><path d="M5 10v2a7 7 0 0 0 12 5" /><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12" /><line x1="12" x2="12" y1="19" y2="22" /></svg>}
                        </button>
                        <input
                            type="text"
                            className="p-2 w-full rounded-lg border border-black outline-neutro-tertiary"
                            placeholder="Escribe tu mensaje aquí..."
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !isTyping) handleSendMessage(); }}
                        />
                        <button disabled={isTyping} onClick={handleSendMessage} className="bg-neutro-tertiary text-white px-2 rounded-lg hover:animate-pulse" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6"><path d="m3 3 3 9-3 9 19-9Z"></path><path d="M6 12h16"></path></svg>
                        </button>
                    </div>
                </div>
            )}

            {showContactPopup && (
                <div className="absolute top-6 right-6 bg-white p-4 shadow-lg rounded-lg">
                    <h2 className="font-bold text-lg">Contactar Asesor</h2>
                    <p>¿Deseas hablar con un asesor ahora?</p>
                    <button onClick={handleContactAdvisor} className="bg-neutro-tertiary w-full text-white p-2 rounded-md hover:bg-gray-400 mt-2">
                        Contactar
                    </button>
                </div>
            )}

            {showAdvisorContactForm && (
                <div className="fixed inset-0 bg-black bg-opacity-55 flex p-4 justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Formulario de Contacto</h2>
                        <div>
                            <label htmlFor="contactName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                            <input type="text" id="contactName" className="p-2 w-full rounded-lg border border-black" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">Número de Teléfono:</label>
                            <input type="tel" id="contactPhone" className="p-2 w-full rounded-lg border border-black" value={userPhone} onChange={handlePhoneChange} />
                        </div>
                        <button type="button" onClick={handleSendOfData} className="bg-neutro-tertiary text-white py-2 px-4 rounded-lg hover:animate-pulse">Enviar</button>
                        <button type="button" onClick={() => setShowAdvisorContactForm(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:animate-pulse ml-4">Cancelar</button>
                    </div>
                </div>
            )}

            {confirmationMessageVisible && (
                <div className="absolute bottom-4 border-2 border-neutro-tertiary right-4 bg-white shadow-xl rounded-md text-black p-4">
                    <p>Perfecto, un asesor se contactará contigo.</p>
                </div>
            )}
        </div>
    );
}

export default Chat;