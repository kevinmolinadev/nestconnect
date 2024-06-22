import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/home/home.jpg"
import { ErrorContext } from "../../../context/error";
import { useMutation } from "@tanstack/react-query";
import { AuthService, UserService } from "../../../../infraestructure";
import { UserContext } from "../../../context/user";
import { NeedVerfication } from "../../../components/need-verification";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const [needValidationEmail, setNeedValidationEmail] = useState(false);
    const { updateError } = useContext(ErrorContext);
    const { updateUser } = useContext(UserContext);
    const login = useMutation({ mutationFn: (user) => AuthService.logIn(user), onSuccess: (data) => handleUser(data), onError: (e) => updateError(e.message) })

    const handleUser = async (data) => {
        const { validatedEmail } = data;
        if (!validatedEmail) {
            setNeedValidationEmail(true)
        } else {
            const user = await UserService.getProfile();
            updateUser(user);
            navigate("/dashboard")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user.email.match(/^[a-zA-Z0-9._%+-]+@(est\.)?univalle\.edu$/)) return updateError("Por favor ingrese un correo institucional")
        login.mutate(user)
    }

    if (needValidationEmail) return <NeedVerfication email={user.email} />

    return (
        <>
            <div className="hidden lg:flex flex-grow">
                <div className="w-[55%]" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center bg-white p-8 text-black">
                    <div className="w-3/5">
                        <h2 className="text-3xl mb-4">BIENVENIDO</h2>
                        <p className="mb-8">ES UN GUSTO VOLVER A VERTE</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <input type="email" id="email" required onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                }} placeholder="Correo Electrónico" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                            </div>
                            <div className="mb-2">
                                <input type="password" required onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                }} placeholder="Contraseña" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                            </div>
                            <div className="text-right">
                                <Link to="/forgot-password" className=" text-[#522B46] cursor-pointer mb-4 block">
                                    Olvidé mi contraseña
                                </Link>
                            </div>
                            <button className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >INICIAR SESION</button>
                            <div className="flex gap-1 mt-4">
                                <p>Aun no tienes una cuenta?</p>
                                <Link to="/signup" className="text-neutro-tertiary">Registrate</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="lg:hidden flex-grow flex flex-col">
                <div className="flex-grow flex flex-col justify-center items-center relative overflow-hidden">
                    <img className="absolute top-0 object-cover w-full h-full object-center" src={backgroundImage} alt="Background" />
                    <div className="bg-white bg-opacity-75 p-8 relative z-10 rounded-lg shadow-2xl w-11/12">
                        <h2 className="text-4xl font-bold text-[#522B46] mb-6 text-center">BIENVENIDO</h2>
                        <p className="text-center mb-8">ES UN GUSTO VOLVER A VERTE</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <input 
                                    type="email"
                                    id="email-mobile"
                                    required
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    placeholder="Correo Electrónico"
                                    className="w-full p-2 rounded-md outline-neutro-tertiary"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    required
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    placeholder="Contraseña"
                                    className="w-full p-2 rounded-md outline-neutro-tertiary"
                                />
                            </div>
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-[#522B46] cursor-pointer mb-4 block">
                                    Olvidé mi contraseña
                                </Link>
                            </div>
                            <button className="bg-[#522B46] text-white rounded-md p-2 w-full mt-4 hover:bg-[#A7A9AC] transition-colors duration-300">
                                INICIAR SESION
                            </button>
                            <div className="flex gap-1 justify-center mt-4">
                                <p>Aun no tienes una cuenta?</p>
                                <Link to="/signup" className="text-[#522B46]">Registrate</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;