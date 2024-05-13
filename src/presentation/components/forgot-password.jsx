import { useState } from "react";
import Home from "../assets/home/home.jpg"
import { AuthService } from "../../infraestructure";
import VerificationCode from "./verification-code";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const sendData = useMutation({ mutationFn: (email) => AuthService.sendResetPasswordCode({ email }) })

  const handleValue = (e) => {
    setEmail(e.target.value.trim())
  }


  const handleSend = async (e) => {
    e.preventDefault();
    sendData.mutate(email);
  };

  if (sendData.isSuccess) return <VerificationCode />

  if (sendData.isError) console.log(sendData.error.message);  

  return (
    <div className="flex items-center justify-center relative flex-grow bg-gray-900" style={{ backgroundImage: `url(${Home})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
      <div className="bg-white p-8 rounded-lg shadow-2xl" style={{ maxWidth: '400px' }}>
        <form className="space-y-6" onSubmit={handleSend}>
          <h2 className="text-gray-900 text-3xl text-center mb-6">Recuperación de Contraseña</h2>
          <p className="text-gray-900 text-opacity-75 mb-4 text-sm text-center">Introduce tu dirección de correo electrónico a continuación y te enviaremos un código de verificación para restablecer tu contraseña.</p>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-900 mb-2">Correo Electrónico</label>
            <input type="email" id="email" className="p-3 rounded bg-gray-200 w-full" placeholder="Introduce tu correo electrónico" required value={email} onChange={handleValue} />
          </div>
          <button className="bg-neutro-tertiary text-white w-full p-3 rounded-md transition duration-300 mt-4">Enviar</button>
        </form>
      </div>

    </div>
  )
}
export default ForgotPassword;