import React, { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import EventosScreen from './pages/EventosScreen';
import ForgotPassword from './pages/ForgotPassword';
import FAQ from './assets/FAQ.png'
import Home from "./assets/home.jpg";
import Carreras from "./assets/carreras.png";
import Eventos from "./assets/eventos.png";
import OP from "./assets/op.jpg";
import Uni from "./assets/univalle.jpg";
import ChatScreen from './pages/ChatScreen';
import ItemsScreen from './pages/ItemsScreen';
import FaqScreen from './pages/FaqScreen';
import ProfileScreen from './pages/ProfileScreen';

function EstScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const showLoginScreen = () => setCurrentScreen('login');
  if (currentScreen === 'login') {
    return <LoginScreen />;
  }
  const showEventosScreen = () => setCurrentScreen('eventos');
  if (currentScreen === 'eventos') {
    return <EventosScreen />;
  }
  const showChatScreen = () => setCurrentScreen('chatscreen');
  if (currentScreen === 'chatscreen') {
    return <ChatScreen />;
  }
  const showItemsScreen = () => setCurrentScreen('itemscreen');
  if (currentScreen === 'itemscreen') {
    return <ItemsScreen />;
  }
  const showFaqScreen = () => setCurrentScreen('faqscreen');
  if (currentScreen === 'faqscreen') {
    return <FaqScreen />;
  }
  const showProfileScreen = () => setCurrentScreen('ProfileScreen');
  if (currentScreen === 'ProfileScreen') {
    return <ProfileScreen/>;
  }

 
  
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-neutro-tertiary p-8 flex justify-between items-cente">
          <h1 className="text-4xl text-white">¡Bienvenido a la Universidad Privada del Valle!</h1>
          <button className="bg-neutro-primary text-white px-5 py-4 rounded-md inline-block" onClick={showLoginScreen}>Iniciar Sesión</button>
          <button className="bg-neutro-primary text-white px-5 py-4 rounded-md inline-block" onClick={showProfileScreen}>Perfil</button>

        </div>
        <div className="h-full flex overflow-hidden">
          <div className="w-1/2 flex">
            <img className="h-4/5 m-auto rounded-md" src={Uni} alt="home" />
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <article className="text-white text-center bg-neutro-tertiary w-4/5 p-8 rounded-xl">
              <h2 className="text-3xl  mb-4">AVU: Tu Asistente Virtual Univalle</h2>
              <p className="whitespace-pre-wrap">
                AVU está aquí para guiarte a través de tu viaje
                educativo, ofreciéndote soporte instantáneo, respuestas
                personalizadas y acceso sin precedentes a recursos
                académicos.
                <br />
                <br />
                En la intersección de la innovación tecnológica y la excelencia académica, AVU (Asistente Virtual Univalle) emerge como tu compañero inteligente y personalizado, diseñado para enriquecer tu experiencia universitaria. Desarrollado con la última tecnología en inteligencia artificial.
              </p>
              <button onClick={showChatScreen} className="bg-neutro-primary px-6 py-4 rounded-md text-white">
            Iniciar Chat Con A.V.U.
          </button>
            </article>
          </div>
        </div>
        
      </div>

      <div className="h-full flex overflow-hidden bg-[#422D73]">
            <div className="w-full flex justify-center items-center">
              <article className="text-white text-center bg-neutro-tertiary w-full flex justify-between items-center p-8 rounded-xl">
                <div className="w-1/2">
                  <h2 className="text-3xl mb-4">Preguntas Frecuentes</h2>
                  <p className="whitespace-pre-wrap">
                  ¿Tienes dudas sobre la vida universitaria, el proceso de admisión, opciones de becas, o servicios académicos en la Universidad Privada del Valle? Nuestra sección de Preguntas Frecuentes está aquí para proporcionarte todas las respuestas que necesitas. Descubre información esencial sobre matrículas, asistencia financiera, programas de estudio, servicios estudiantiles, y mucho más, todo en un solo lugar.
                  </p>
                  <button onClick={showFaqScreen} className="bg-neutro-primary px-6 rounded-md py-4 mt-12 inline-block">
                    Más Información
                  </button>
                </div>
                <div className="w-1/2 flex justify-center">
                  <img className="h-4/5 m-auto rounded-md" src={FAQ} alt="FAQ" />
                </div>
              </article>
            </div>
          </div>

<div className="h-full flex overflow-hidden">
          <div className="w-1/2 flex">
            <img className="h-4/5 m-auto rounded-md" src={Eventos} alt="eventos" />
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <article className="text-white text-center bg-neutro-tertiary w-4/5 p-8 rounded-xl">
              <h2 className="text-3xl  mb-4">EVENTOS</h2>
              <p className="whitespace-pre-wrap">
              Integrar información sobre eventos universitarios en el concepto de tu Asistente Virtual Univalle (AVU) añade una dimensión vibrante y comunitaria a la experiencia del usuario. A continuación, te ofrezco una propuesta de contenido enfocado en cómo AVU puede ayudar a los usuarios a descubrir y participar en los eventos de la universidad, fomentando así un sentido de pertenencia y enriquecimiento cultural y académico.
                <br />
                
              </p>
              <button onClick={showEventosScreen} className="bg-neutro-primary px-6 py-4 rounded-md text-white">
            Ver eventos
          </button>
            </article>
          </div>
        </div>
        <div className="flex h-full overflow-hidden bg-[#422D73]">
  <div className="w-full flex justify-center items-center">
    <article className="text-white text-center bg-neutro-tertiary w-full flex justify-between items-center p-8 rounded-xl">
      <div className="w-1/2">
        <h2 className="text-3xl mb-4">OBJETOS PERDIDOS</h2>
        <p className="whitespace-pre-wrap">
        La vida universitaria es dinámica y ajetreada, y en medio del bullicio, los objetos personales a veces se extravían. Pero no te preocupes, AVU, tu Asistente Virtual Univalle, está aquí para ayudarte a recuperar lo perdido. Nuestra función de objetos perdidos en AVU ofrece una solución organizada y accesible para reportar o buscar artículos perdidos dentro del campus universitario.
          <br />
        </p>
        <button onClick={showItemsScreen} className="bg-neutro-primary px-6 py-4 rounded-md text-white">
            Objetos Perdidos
          </button>
      </div>
      <div className="w-1/2 flex justify-center"> 
        <img className="w-2/3 h-auto m-auto rounded-md" src={OP} alt="op" /> 
      </div>
    </article>
  </div>
  
</div>
<div className="h-full flex overflow-hidden">
          <div className="w-1/2 flex">
            <img className="h-4/5 m-auto rounded-md" src={Carreras} alt="eventos" />
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <article className="text-white text-center bg-neutro-tertiary w-4/5 p-8 rounded-xl">
              <h2 className="text-3xl  mb-4">Descubre tu Carrera Ideal</h2>
              <p className="whitespace-pre-wrap">
              Descubre el amplio abanico de carreras ofrecidas por nuestra universidad y las oportunidades de becas disponibles para ayudarte a alcanzar tus metas académicas y profesionales.
                
              </p>
              <button onClick={showEventosScreen} className="bg-neutro-primary px-6 py-4 rounded-md text-white">
            Ver eventos
          </button>
            </article>
          </div>
        </div>
    </>
  )
}

export default EstScreen
