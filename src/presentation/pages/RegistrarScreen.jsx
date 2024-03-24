import { useState } from 'react';
import Home from "../assets/home.jpg";
import ForgotPassword from './ForgotPassword';

function RegistrarScreen() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Aquí iría el código para manejar el registro del usuario
        console.log({ name, lastName, email, userType, password });
    };

    if (showForgotPassword) {
        return <ForgotPassword />;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow justify-center items-center">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${Home})` }}>
                    <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-2xl"
                         style={{
                             maxWidth: '500px',
                             margin: 'auto',
                             marginTop: '20vh'
                         }}>
                        <h1 className="text-4xl font-bold text-[#522B46] mb-6 text-center">BIENVENIDO A A.V.U</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Nombre" 
                                    className="p-2 rounded-md w-full" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Apellidos" 
                                    className="p-2 rounded-md w-full" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="email" 
                                    placeholder="Correo Electrónico" 
                                    className="p-2 rounded-md w-full" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <select 
                                    className="p-2 rounded-md w-full"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="">Selecciona tipo de usuario</option>
                                    <option value="estudiante">Estudiante</option>
                                    <option value="profesor">Profesor</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className="p-2 rounded-md w-full" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-[#522B46] text-white rounded-md p-2 w-full mt-4 hover:bg-[#422D73] transition-colors duration-300">Regístrate</button>
                        </form>
                        <a onClick={handleForgotPasswordClick} className="text-lg text-[#522B46] cursor-pointer mt-4 block">
                            Olvidé mi contraseña
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarScreen;
