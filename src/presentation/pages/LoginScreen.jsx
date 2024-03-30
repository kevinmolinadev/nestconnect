import { useState } from 'react';
import backgroundImage from "../assets/home.jpg";
import RegistrarScreen from './RegistrarScreen';
import ForgotPassword from './ForgotPassword';

function LoginScreen() {

  const [currentScreen, setCurrentScreen] = useState('home');

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [user, setUser] = useState({ email: "", password: "" });

  if (showForgotPassword) {
    return <ForgotPassword />;
  }

  if (currentScreen === 'registrarScreen') {
    return <RegistrarScreen />;
  }

  if (currentScreen === "profileScrem") {
    //aqui pasan a la pantalla del dashboard del usuario
  }

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const showRegistrarScreen = () => setCurrentScreen('registrarScreen');

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      console.log("Login exitoso")
      setCurrentScreen("profileScrem")
    }
  }

  // A continuación, el contenido de la pantalla 'home' (pantalla de inicio)
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
              <input type="text" onChange={(e) => {
                setUser({ ...user, email: e.target.value })
              }} placeholder="Correo Electrónico" className="w-full p-2 rounded-md" />
            </div>
            <div className="mb-4">
              <input type="password" onChange={(e) => {
                setUser({ ...user, password: e.target.value })
              }} placeholder="Contraseña" className="w-full p-2 rounded-md" />
            </div>
            <div className="mb-8 text-right">
              <a onClick={handleForgotPasswordClick} className="text-lg text-[#522B46] cursor-pointer mt-4 block">
                Olvidé mi contraseña
              </a>
            </div>
            <button type="button" onClick={handleLogin} className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >INICIAR SESION</button>
            <button type="button" onClick={showRegistrarScreen} className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 mt-4 text-white">REGISTRARME</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;