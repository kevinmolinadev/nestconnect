import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import EventosScreen from './EventosScreen';
import ForgotPassword from './ForgotPassword';

import Home from "./assets/home.jpg";
import Carreras from "./assets/carreras.png";
import Eventos from "./assets/eventos.png";
import OP from "./assets/op.jpg";
import Uni from "./assets/univalle.jpg";

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const showLoginScreen = () => setCurrentScreen('login');
  if (currentScreen === 'login') {
    return <LoginScreen />;
  }
  const showEventosScreen = () => setCurrentScreen('eventos');
  if (currentScreen === 'eventos') {
    return <EventosScreen />;
  }
  
  return (

    <>
      <div className="h-screen flex flex-col">
        <div className="bg-neutro-tertiary p-8 flex justify-between items-cente">
          <h1 className="text-4xl text-white">¡Bienvenido a la Universidad Privada del Valle!</h1>
          <button className="bg-neutro-primary text-white px-5 py-4 rounded-md inline-block" onClick={showLoginScreen}>Iniciar Sesión</button>

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
              <a className="bg-neutro-primary px-6 rounded-md py-4 mt-12 inline-block" href="">Iniciar chat con A.V.U</a>
            </article>
          </div>
        </div>
        
      </div>
      <div className="flex h-full overflow-hidden bg-[#422D73]">
  <div className="w-full flex justify-center items-center">
    <article className="text-white text-center bg-neutro-tertiary w-full flex justify-between items-center p-8 rounded-xl">
      <div className="w-1/2">
        <h2 className="text-3xl mb-4">Descubre tu Carrera Ideal</h2>
        <p className="whitespace-pre-wrap">
        Descubre el amplio abanico de carreras ofrecidas por nuestra universidad y las oportunidades de becas disponibles para ayudarte a alcanzar tus metas académicas y profesionales.
          <br />
        </p>
        <a className="bg-neutro-primary px-6 rounded-md py-4 mt-12 inline-block" href="#">Mas Informacion</a>
      </div>
      <div className="w-1/2 flex justify-center"> 
        <img className="w-4/3 h-auto m-auto rounded-md" src={Carreras} alt="carreras" /> 
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
        <a className="bg-neutro-primary px-6 rounded-md py-4 mt-12 inline-block" href="#">Iniciar chat con A.V.U</a>
      </div>
      <div className="w-1/2 flex justify-center"> 
        <img className="w-2/3 h-auto m-auto rounded-md" src={OP} alt="op" /> 
      </div>
    </article>
  </div>
</div>
    </>
  )
}

export default App
