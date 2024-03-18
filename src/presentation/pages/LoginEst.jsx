import  { useState } from 'react';

import backgroundImage from"../assets/home.jpg";
import RegistrarScreen from './RegistrarScreen'; 

function LoginEst() {
    const [currentScreen, setCurrentScreen] = useState('home');

    const showRegistrarScreen = () => setCurrentScreen('registrarScreen');

    if (currentScreen === 'registrarScreen') {
        return <RegistrarScreen />;
    }
  
  return (
    <div className="min-h-screen flex">
      <header className="w-full bg-neutro-tertiary p-7 text-center text-white fixed top-0 left-0 right-0 z-10">
      </header>


      <div className="w-1/2" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
      </div>
      <div className="w-1/2 flex flex-col justify-center bg-white p-12 text-black">
        <div className="max-w-sm m-auto">
          <h2 className="text-3xl mb-4">BIENVENIDO A A.V.U</h2>
          <p className="mb-8">ES UN GUSTO VOLVER A VERTE</p>
          <form>
            {/* Asumiendo que aquí iría tu lógica de formulario */}
            <div className="mb-4">
              <input type="text" placeholder="Correo Electrónico" className="w-full p-2 rounded-md" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Contraseña" className="w-full p-2 rounded-md" />
            </div>
            <div className="mb-8 text-right">
              <a href="#" className="text-sm text-black hover:underline">Olvidé mi contraseña</a>
            </div>
            <button type="submit" className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >Iniciar sesión</button>
            <button type="button" onClick={showRegistrarScreen} className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginEst;